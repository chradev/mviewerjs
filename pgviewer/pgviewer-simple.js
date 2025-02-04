/*
      Christo Radev IPoP:  chradev@radevs.net
    https://www.radevs.net/chradev

    Thanks to following people, projects and publications: 
        Kelvin Au: https://github.com/kelvinau/Random-Irregular-Polygon
        Edwin Josué Brenes Cambronero: https://github.com/EdwinJosue16/von-koch-fractal-js/tree/main
        Klatu1494: https://github.com/Klatu1494/polygon-generator/tree/master
        Harry Love: https://observablehq.com/@harrylove/draw-a-line-path-with-d3

    License: Take it, use it, make it better, and love it!

    It is computed an equilateral polygon inscribed in a circle with R = 1 (D = 2).
    Calculated polygon is drawn on SVG using HTML, JS, d3, React DOM, etc. 
    In animation, the number of points is like counting forward and backward:
    2 (line), 3 (triangle), 4 (quadrilateral), ..., polygon with N sides / vertices
    In the advanced variant, the sides will be replaced with Koch fractal curves.
*/

// Regular poligon constants
const MIN_OF_POINTS   = 2;
const MAX_OF_POINTS   = 12;
var FIRST_COUNT       = true;
var DIR_FORWARD       = true;
var ANIMATION_PAUSE   = false;
var NUM_OF_POINTS     = MIN_OF_POINTS;

// Animation speed constants
const LINE_DURATION   = 100;  // 500
const TOTAL_DURATION  = 100;  // 500
const SPEED_COEFF     = 500;  // 1000
const DOTS_DURATION   = 500; // 5000
const LOOP_UPDATE     = 2000; // 6000
const OTHER_DELAIS    = 500;  // 500

// Circle constants
const CIRCLE_RADIUS   = 8;
const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#888800', '#880088', '#008888'];

function getNextNumOfPoints () {
  if (FIRST_COUNT) {
    FIRST_COUNT   = false;
    return NUM_OF_POINTS;
  }
  if (DIR_FORWARD) {
    ++NUM_OF_POINTS;
    if (NUM_OF_POINTS >= MAX_OF_POINTS)
      DIR_FORWARD = false;
  } else {
    --NUM_OF_POINTS;
    if (NUM_OF_POINTS <= MIN_OF_POINTS)
      DIR_FORWARD = true;
  }
  return NUM_OF_POINTS;
}

function getData() {
  const generator = new RIP({
    numOfPoints: getNextNumOfPoints()
  });

  const coords = generator.getPolygonCoord();

  const dotData = coords.map(({ x, y }, i) => {
    return {
      x,
      y,
      color: i % 6,
    };
  });

  const lineData = [];
  for (let i = 1; i < coords.length; i++) {
    lineData.push({
      x1: coords[i - 1].x,
      y1: coords[i - 1].y,
      x2: coords[i].x,
      y2: coords[i].y,
    });
  }
  // close the path
  lineData.push({
    x1: coords[coords.length - 1].x,
    y1: coords[coords.length - 1].y,
    x2: coords[0].x,
    y2: coords[0].y,
  });

  return {
    dotData,
    lineData,
  };
}

var app;
class App extends React.Component {
  constructor(props) {
    super(props);
    const { dotData, lineData } = getData();
    this.state = {
      dotData,
      lineData,
    };
    this.svgEl = React.createRef();
    this.resetData = this.resetData.bind(this);
    app = this;
    document.getElementById("root").addEventListener("click", function() {
        ANIMATION_PAUSE = ! ANIMATION_PAUSE;
        if (ANIMATION_PAUSE) return;
        d3.select(document.querySelector("svg")).selectAll('path').remove();
        app.resetData();
    });
  }

  updateChart(firstTime) {
    if (ANIMATION_PAUSE) return;

    const MAX_WIDTH = this.svgEl.current.width.baseVal.value - CIRCLE_RADIUS;
    const MAX_HEIGHT = this.svgEl.current.height.baseVal.value - CIRCLE_RADIUS;
    const MIN_MAX_SIZE = Math.min(MAX_WIDTH, MAX_HEIGHT);
    const CENTER_X = this.svgEl.current.width.baseVal.value / 2;
    const CENTER_Y = this.svgEl.current.height.baseVal.value / 2;

    // For calculating circle with R = 1 (D = 2) will be used
    const xScale = d3
      .scaleLinear()
      .domain([0, 2])
      .range([CIRCLE_RADIUS, MIN_MAX_SIZE]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 2])
      .range([CIRCLE_RADIUS, MIN_MAX_SIZE]);

    const waitTime = [];
    this.state.lineData.reduce((totalWaitTime, d) => {
      // distance / time
      const speed =
        Math.sqrt(Math.pow(d.x2 - d.x1, 2) + Math.pow(d.y2 - d.y1, 2)) /
        LINE_DURATION;

      totalWaitTime += speed * SPEED_COEFF;
      waitTime.push(totalWaitTime);
      return totalWaitTime;
    }, TOTAL_DURATION);

    const scaledDotData = this.state.dotData.map(({x, y, color}) => {
      return {
        x: xScale(x),
        y: yScale(y),
        color,
      }
    })

    // dots
    const dots = d3
      .select(this.svgEl.current)
      .selectAll('circle')
      .data(scaledDotData);

    dots
      .enter()
      .append('circle')
      .attr('data-x', d => d.x)
      .attr('data-y', d => d.y)
      .attr('cx', CENTER_X)
      .attr('cy', CENTER_Y)
      .style('fill', '#fff')
      .merge(dots)
      .transition()
      .duration(DOTS_DURATION)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => CIRCLE_RADIUS)
      .style('fill', d => COLORS[d.color]);

    dots
      .exit()
      .transition()
      .duration(DOTS_DURATION)
      .attr('cx', CENTER_X)
      .attr('cy', CENTER_Y)
      .attr('r', d => 0)
      .remove();

    // lines
    d3.select(this.svgEl.current)
      .selectAll('line')
      .remove();

    const lines = d3
      .select(this.svgEl.current)
      .selectAll('line')
      .data(this.state.lineData);

    lines
      .enter()
      // insert before circle to hide the overlapping line
      .insert('line', 'circle')
      .attr('x1', d => xScale(d.x1))
      .attr('y1', d => yScale(d.y1))
      .attr('x2', d => xScale(d.x1))
      .attr('y2', d => yScale(d.y1))
      .transition()
      .delay(function(d, i) {
        return waitTime[i];
      })
      .duration(LINE_DURATION)
      .attr('x2', d => xScale(d.x2))
      .attr('y2', d => yScale(d.y2))
      .style('stroke', 'silver')
      .style('stroke-width', 2);

    lines.exit().remove();

    // paths
    d3.select(this.svgEl.current)
      .selectAll('path')
      .remove();

    setTimeout(() => {
      var elem = d3.select(this.svgEl.current).selectAll('line');
      var svgC = d3.select(this.svgEl.current);
      hideShowLines(elem, svgC);
      // loop updateChart
      setTimeout(() => {
        this.resetData();
      }, LOOP_UPDATE);
    }, !firstTime ? waitTime[waitTime.length - 1] + LINE_DURATION : 0);

    function hideShowLines(elem, svgC, numOfTimes = 0) {
      if (numOfTimes === 6) {
        return;
      }
/*
      // Plot new paths as Koch curves - not finished!
      svgC.selectAll('line').remove();
      svgC.selectAll('path').remove();
      if (numOfTimes < 1) {
        elem.each(function(d) {
          svgC.append('path')
              .attr('d', d3.line()([[xScale(d.x1), xScale(d.y1)], [xScale(d.x2), xScale(d.y2)]]))
              .attr('stroke', 'black')
              .style('stroke-width', 2)
              .attr('fill', 'none');
        });
      } else {
        elem.each(function(d) {
          svgC.append('path')
              .attr('d', d3.line()([[xScale(d.x1), xScale(d.y1)], [xScale((d.x1+d.x2)/2), 
                  xScale(numOfTimes % 2 === 0 ? (d.y1+d.y2)/3 : (d.y1+d.y2)/4)]]))
              .attr('stroke', 'black')
              .style('stroke-width', 2)
              .attr('fill', 'none');
        });
      }
*/
      setTimeout(() => {
        elem.style('opacity', numOfTimes % 2);
//        elem.style('stroke', COLORS[numOfTimes % 6]);
        hideShowLines(elem, svgC, numOfTimes + 1);
      }, OTHER_DELAIS);
    }
  }
  resetData() {
    const { dotData, lineData } = getData();
    this.setState({
      dotData,
      lineData,
    });
  }
  render() {
    return (
      <div>
        {/*
        <div className="generate-btn">
          <button onClick={this.resetData}>Generate Chart</button>
        </div>
        */}
        <svg width="100%" height="100%" ref={this.svgEl} />
      </div>
    );
  }
  componentDidMount() {
    setTimeout(() => this.updateChart(true), OTHER_DELAIS);
  }
  componentDidUpdate() {
    this.updateChart();
  }
}
ReactDOM.render(<App />, document.getElementById('root'));


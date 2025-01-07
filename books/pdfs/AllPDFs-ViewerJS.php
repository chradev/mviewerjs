<?php
  function sizeFilter( $bytes ) {
      $label = array( 'B', 'KB', 'MB', 'GB', 'TB', 'PB' );
      for( $i = 0; $bytes >= 1024 && $i < ( count( $label ) -1 ); $bytes /= 1024, $i++ );
      return( round( $bytes, 2 ) . " " . $label[$i] );
  }
  if ($handle = opendir('.')) {
    $files=array();
    while (false !== ($file = readdir($handle))) {
      if ($file != "." && $file != ".." && substr($file, strrpos($file, ".") + 1) == "pdf") {
        $files[] = $file;
      }
    }
    closedir($handle);
  }
  natsort($files); //sort
  foreach($files as $file) {
        $date = date(filemtime($file));
        $filelist .= '<li><a href="../../libs/ViewerJS/#../../books/pdfs/'.$file.'">'.$file.'</a></li>';
        $sizelist .= '<li>'.sizeFilter(filesize($file)).'</li>';
        $timelist .= '<li>'.date('M d Y H:i', $date).'</li>';
        clearstatcache();
  }
?>
<h3>List of all PDF files with link to ViewerJS without music accompaniment:</h3>
<table><tr><pre>
<td><ul style="list-style-type:none"><li><?php echo $filelist; ?></li><ul></td>
<td><ul style="list-style-type:none; text-align: right;"><li><?php echo $sizelist; ?></li><ul></td>
<td><ul style="list-style-type:none"><li><?php echo $timelist; ?></li><ul></td>
</pre></tr></table>



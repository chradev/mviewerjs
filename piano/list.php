<?php
  if ($handle = opendir('./midi/')) {
    while (false !== ($file = readdir($handle))) {
      if ($file != "." && $file != ".." && strtolower(substr($file, strrpos($file, '.') + 1)) == 'mid') {
        echo substr($file, 0, strrpos($file, '.')).';';
      }
    }
    closedir($handle);
  }
?>

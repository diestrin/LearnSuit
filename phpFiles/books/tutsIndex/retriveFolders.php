<?php	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 
ob_start();

if(isset($_COOKIE['auth'])){
	$rootPath = '../../';
	$htmlPath = '';

	if(file_exists($rootPath)){
		if(is_dir($rootPath)){
		    $pathAr = scandir($rootPath);
		    $totalFiles=0;

		    function getAllInside($dir,$_path){
		    	global $rootPath,$totalFiles,$htmlPath;
		    	$folderItems = array();
				$filesItems = array();

			    foreach($dir as $elem){
			    	if($elem=='.' || $elem=='..' || $elem=='tutsIndex'){
		    			continue;
		    		}
		    		if($elem=='index.html' || $elem=='center.html' && $rootPath.$_path=='../../'){
		    			continue;
		    		}
			    	if(filetype($rootPath.$_path.$elem)=='file'){
			    		$_temFile = pathinfo($rootPath.$_path.$elem);
			    		$_temArr = array(
			    			"type"=>$_temFile['extension'],
			    			"path"=>utf8_encode($htmlPath.preg_replace('/(\.{2}\/){2}/','',"$_temFile[dirname]/$elem")),
			    			"fileName"=>ucfirst(utf8_encode($elem))
			    		);
			    		$totalFiles++;
			    		$filesItems[]=$_temArr;
			    	}elseif(filetype($rootPath.$_path.$elem)=='dir'){
			    		$_temArr = array(
			    			"name"=>ucfirst(utf8_encode($elem)),
			    			"path"=>utf8_encode($htmlPath.$_path.$elem),
			    			"items"=>getAllInside(scandir($rootPath.$_path.$elem),$_path.$elem."/")
			    		);
			    		$folderItems[]=$_temArr;
			    	}
			    }

			    return array("folders"=>$folderItems,"files"=>$filesItems);
			}

			$finalJSON=getAllInside($pathAr,'');
			$finalJSON["totalFiles"]=$totalFiles;

		    echo json_encode($finalJSON);
		}else{
			echo 'Error 0004';
		}
	}else{
		echo 'Error 0003';
	}
}else{
	echo 'Error 0001';
}

/*
	Error 0001 = Error, unknow user
	Error 0002 = Error, no path given
	Error 0003 = Error, file doesn't exist
	Error 0004 = Error reading the directory
*/

ob_end_flush();
?>
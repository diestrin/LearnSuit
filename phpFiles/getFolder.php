<?php

if(isset($_GET["callback"]))
	echo "$_GET[callback] (";

if(isset($_GET["1"]))

echo <<<EOD
[
	{
		id: "cuatro",
		name: "SubFolder tres",
		type: "dir"
	},
	{
		id: "cinco",
		name: "SubFolder cuatro",
		type: "folder"
	},
	{
		id: "seis",
		name: "Libro dos",
		type: "file"
	}
]
EOD;

else

echo <<<EOD
[
	{
		id: "uno",
		name: "Folder uno",
		type: "dir"
	},
	{
		id: "dos",
		name: "Folder dos",
		type: "folder"
	},
	{
		id: "tres",
		name: "Libro uno",
		type: "file"
	}
]
EOD;

if(isset($_GET["callback"]))
	echo ");";

?>
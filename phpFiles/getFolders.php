<?php

if(isset($_GET["callback"]))
	echo "$_GET[callback] (";

echo <<<EOD
[
	{
		id: "uno",
		name: "Folder uno",
		type: "dir",
		items:[
			{
				id: "cuatro",
				name: "Libro cuatro",
				type: "file"
			}
		]
	},
	{
		id: "dos",
		name: "Folder dos",
		type: "folder",
		items:[
			{
				id: "cinco",
				name: "Libro cinco",
				type: "file"
			}
		]
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
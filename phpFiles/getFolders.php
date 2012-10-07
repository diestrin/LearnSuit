<?php

if(isset($_GET["callback"]))
	echo "$_GET[callback] (";
echo <<<EOD
[
	{
		name: "Folder uno",
		type: "folder",
		url: "uno",
		items: [{
			name: "Folder X",
			type: "folder",
			url: "uno/X",
			items: [{
				name: "Libro Patito",
				type: "file",
				url: "uno/X/patito.file"
			}]
		},{
			name: "Libro cuatro",
			type: "file",
			url: "uno/cuatro.file"
		}]
	},
	{
		name: "Folder dos",
		type: "folder",
		url: "dos",
		items: [{
			name: "Libro cinco",
			type: "file",
			url: "dos/cinco.file"
		}]
	},
	{
		name: "Libro uno",
		type: "file",
		url: "uno.file"
	}
]
EOD;

if(isset($_GET["callback"]))
	echo ");";

?>
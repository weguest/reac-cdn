<?php 

    

    $lista = array(
        array(
            "id"=> 1,
            "parent_id" => null,
            "nome"=>"Paninel XYZ",
            "estado" => "",
            "descricao"=> ""
        ),
        array(
            "id"=> 2,
            "parent_id" => 1,
            "nome"=>"IBX XPTO",
            "estado" => "Normal",
            "descricao"=> ""
        ),
        array(
            "id"=> 3,
            "parent_id" => 1,
            "nome"=>"IBX ABC",
            "estado" => "Normal",
            "descricao"=> ""
        ),
        array(
            "id"=> 4,
            "parent_id" => 2,
            "nome"=>"IBX NOVO",
            "estado" => "Normal",
            "descricao"=> ""
        )
    );

    $lista_filtrada = array_filter($lista, function($k) {
        $parent_id = array_key_exists('id',$_GET) ? $_GET['id'] : 0;
        return $k["parent_id"] == $parent_id;
    }, ARRAY_FILTER_USE_BOTH);

    echo json_encode(array_values($lista_filtrada));


?>
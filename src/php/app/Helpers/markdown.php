<?php

use League\CommonMark\CommonMarkConverter;

if (!function_exists('markdown')) {
    function markdown($text)
    {
        // $converter = new CommonMarkConverter();
        // return $converter->convertToHtml($text);
        return (new Parsedown())->text($text);

    }
}

<?php
function limit_words($string, $word_limit) 
{ 
	$string = strip_tags($string);
  $words = explode(' ', $string, ($word_limit + 1)); 
  if(count($words) > $word_limit) { array_pop($words); 
array_push($words, "..."); } 
  return implode(' ', $words); 
}
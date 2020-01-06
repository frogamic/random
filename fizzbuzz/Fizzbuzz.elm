module Fizzbuzz exposing (main)

fizz number =
  if modBy 3 number == 0 then
    Just "fizz"
  else
    Nothing

buzz number =
  if modBy 5 number == 0 then
    Just "buzz"
  else
    Nothing

fizzbuzz number =
  let
    words = List.filterMap identity [fizz number, buzz number]
  in
    if List.length words == 0 then
      String.fromInt number
    else
      String.concat words

main : String
main =
  String.join ", " (
    List.map fizzbuzz (
      List.range 1 100
    )
  )

#!/usr/bin/env swift

func mkFn(divisible: Int, word: String) -> (Int) -> String {
  return {(i: Int) -> String in
    return (i % divisible == 0 ? word : "")
  }
}

let getFizz = mkFn(divisible: 3, word: "Fizz")
let getBuzz = mkFn(divisible: 5, word: "Buzz")

func fizzbuzz(i: Int) -> String {
  let response = getFizz(i) + getBuzz(i)
  return response == "" ? String(i) : response
}

print(Array(1...100).map{ fizzbuzz(i: $0)  })

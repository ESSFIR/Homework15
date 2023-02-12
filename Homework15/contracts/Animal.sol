// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/* OOP
* 1 - encapsulation
* 2 - inheritance
* 3 - abstraction
* 4 - polymorphism 
*/ 

library StringCompare {
    // functionality for comparing strings (copied wrom web)
    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}

abstract contract HasName{
    string internal _name;
    constructor(string memory name){
        _name=name;
    }

    function getName() view public returns(string memory){
        return _name;
    }
}

 abstract contract Animal {
    string constant PLANT = "plant";
    string constant MEAT = "meat";


     function eat(string memory) virtual pure public returns(string memory) {
         return "Nom-nom";
     }

     function speak() pure virtual public returns(string memory) {
         return "...";
     }

     function sleep() pure public returns(string memory) {
         return "Z-z-z";
     }

 }

abstract contract Herbivore is Animal,HasName{

     function eat(string memory food) override pure public onlyPlant(food) returns(string memory) {
         return super.eat(food); // calling parent implementation 
     }

     modifier onlyPlant(string memory food) {
         require(StringCompare.compare(food, PLANT), "This animal can`t eat that!(only plant)");
         _;
     }

 }

abstract contract Carnivorous is Animal, HasName {

    function eat(string memory food) override pure public onlyMeat(food) returns(string memory) {
         return super.eat(food); // calling parent implementation 
     }

    modifier onlyMeat(string memory food) {
         require(StringCompare.compare(food, MEAT), "This animal can`t eat that!(only meat)");
         _;
     }
}
abstract contract Omnivores is Animal,HasName {

    function eat(string memory food) virtual override pure public meatAndPlant(food) returns(string memory) {
         return super.eat(food); // calling parent implementation 
     }

    modifier meatAndPlant (string memory food) {
         require(StringCompare.compare(food, MEAT) || StringCompare.compare(food, PLANT), "This animal can`t eat that!(only meat and plant)");
         _;
     }
}


 contract Cow is Herbivore {

     constructor(string memory name) HasName(name){
    }

    function speak() override pure public returns(string memory) {
         return "Mooo";
     }
 }

 contract Horse is Herbivore {

     constructor(string memory name) HasName(name){
    }
     
     function speak() override pure public returns(string memory) {
         return "Igogo";
     }
 }
contract Wolf is Carnivorous {

    constructor(string memory name) HasName(name){
    }
     
     function speak() override pure public returns(string memory) {
         return "Awooo";
     }
 }

 contract Dog is Omnivores {

     constructor(string memory name) HasName(name){
    }
    // string constant FOOD_RESTRICTED = "chocolate";

    function speak() override pure public returns(string memory) {
         return "Woof";
     }
     
    // modifier noChocolate (string memory food) {
    //      require((StringCompare.compare(food, MEAT) || StringCompare.compare(food, PLANT)) 
    //      && !StringCompare.compare(food, FOOD_RESTRICTED), "Chocolate is dangerous for dogs!!");
    //      _;
    //  }
 } 

 contract Farmer {
     function feed(address animal,string memory food) pure public returns(string memory) {
         return Animal(animal).eat(food);
     }
     
     function call(address animal) pure public returns(string memory) {
         return Animal(animal).speak();
        
     }
 }
var Cow = artifacts.require('Cow');
let cow = null;
var StringCompareLibrary = artifacts.require('StringCompare');
var Farmer = artifacts.require('Farmer');
let farmer = null;
var Horse = artifacts.require('Horse');
let horse = null;
var Wolf = artifacts.require('Wolf');
let wolf = null;
let Dog = artifacts.require('Dog');
let dog = null;

let reaction = "Nom-nom";
let sleepSound = "Z-z-z";

contract("Horse and Farmer", async(account)=>{
  it("Horse has the correct name.", async()=>{
    horse = await Horse.deployed();
    let name = "Trojan";
    res = await AnimalGetName(horse);
    assert.equal(name, res, "horse doesn`t have a name");
  })

  it("Horse can sleep", async()=>{
    res = await AnimalAsleep(horse);
    assert.equal(sleepSound,res, "horse is not asleep");
  })

  it("Horse can eat “plant”", async()=>{
    res = await AnimalEats(horse, "plant");
    assert.equal(reaction, res, "horse doesn`t eat this type of food");
  })

  it("Horse cannot eat ”meat”, ”not-food”, ”plastic””", async()=>{
    let notPreferableFood = ["meat", "not-food", "plastic"];
    for (let i = 0; i < notPreferableFood.length; i++){
      try{
        res = await AnimalEats(horse, notPreferableFood[i]);
      } catch(e){
        res = "Horse tried to eat " + notPreferableFood[i] + " and died :("
      }
    }
    assert.notEqual(reaction, res, "the food put here was acceptable for the horse");
  })

  it("Farmer can call Horse, Horse responds correctly", async()=>{
    let horseSound = "Igogo"
    farmer = await Farmer.deployed();
    res = await CallAnimals(horse.address);
    assert.equal(horseSound,res, "The farmer heard a different sound. Maybe it`s not a horse");
  })

  it("Farmer can feed Horse with plant”", async()=>{
    res = await FeedAnimals(horse.address, "plant");
    assert.equal(reaction, res, "horse doesn`t eat this type of food");
  })

  it("Farmer cannot feed Horse with anything else”", async()=>{
      try{
        res = await FeedAnimals(horse.address, "meat");;
      } catch(e){
        res = "Horse tried to eat it and died :("
      }
    assert.notEqual(reaction, res, "the food put here was acceptable for the horse");
  })
})

contract("Dog and Farmer", async(account)=>{
  it("Dog has the correct name.", async()=>{
    dog = await Dog.deployed();
    let name;
    res = await AnimalGetName(dog);
    assert.notEqual(name, res, "horse doesn`t have a name");
  })

  it("Dog can sleep", async()=>{
    res = await AnimalAsleep(dog);
    assert.equal(sleepSound,res, "dog is not asleep");
  })

  it("Dog can eat “plant”", async()=>{
    res = await AnimalEats(dog, "plant");
    assert.equal(reaction, res, "dog doesn`t eat this type of food");
  })

  it("Dog can eat “meat”", async()=>{
    res = await AnimalEats(dog, "meat");
    assert.equal(reaction, res, "dog doesn`t eat this type of food");
  })

  it("Dog cannot eat ”not-food”, ”plastic”, ”chocolate”", async()=>{
    let notPreferableFood = ["not-food", "plastic", "chocolate"];
    for (let i = 0; i < notPreferableFood.length; i++){
      try{
        res = await AnimalEats(dog, notPreferableFood[i]);
      } catch(e){
        res = "Dog tried to eat " + notPreferableFood[i] + " and died :("
      }
    }
    assert.notEqual(reaction, res, "the food put here was acceptable for the dog");
  })

  it("Farmer can call Dog, Dog responds correctly.", async()=>{
    let dogSound = "Woof"
    farmer = await Farmer.deployed();
    res = await CallAnimals(dog.address);
    assert.equal(dogSound,res, "The farmer heard a different sound. Maybe it`s not a dog");
  })

  it("Farmer can feed Dog with ”meat”,”plant””", async()=>{
    let acceptableFood = ["meat","plant"];
    for (let i = 0; i < acceptableFood.length; i++){
      try{
        res = await FeedAnimals(dog.address, acceptableFood[i]);
      } catch(e){
        res = "Dog tried to eat something different and died :("
      }
    }
    assert.equal(reaction, res, "horse doesn`t eat this type of food");
  })

  it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else.”", async()=>{
    let notPreferableFood = ["not-food", "plastic", "chocolate"];
    for (let i = 0; i < notPreferableFood.length; i++){
      try{
        res = await FeedAnimals(dog.address, notPreferableFood[i]);
      } catch(e){
        res = "Dog tried to eat something different and died :("
      }
    }
    assert.notEqual(reaction, res, "the food put here was acceptable for the dog");
  })
})

async function CallAnimals(address){
  return await farmer.call(address);
}

async function FeedAnimals(address,food){
  return await farmer.feed(address, food);
}

async function AnimalAsleep(animal){
  return await animal.sleep();
}

async function AnimalGetName(animal){
  return await animal.getName();
}

async function AnimalEats(animal, food){
  return await animal.eat(food);
}
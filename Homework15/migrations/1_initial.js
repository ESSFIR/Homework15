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

module.exports = async(deployer)=>{
  await deployer.deploy(StringCompareLibrary)
  await deployer.link(StringCompareLibrary, [Cow, Horse, Wolf, Dog]);
  await deployer.deploy(Cow, "Mashka");
  await deployer.deploy(Farmer);
  await deployer.deploy(Horse, "Trojan");
  await deployer.deploy(Horse, "Trojan");
  await deployer.deploy(Wolf, "Fenrir");
  await deployer.deploy(Dog, "Wolt");
  cow = await Cow.deployed();
  farmer = await Farmer.deployed();
  horse = await Horse.deployed();
  wolf = await Wolf.deployed();

  console.log("---------------------------------------");

  let cowCalled = await CallAnimals(cow.address);
  let horseCalled = await CallAnimals(horse.address);
  console.log("Cow says: " + cowCalled)
  console.log("Horse says: " + horseCalled)
  let wolfFeedMeat = await FeedAnimals(wolf.address, 'meat')
  console.log("Wolf eats meat: " + wolfFeedMeat)
  try{
    let wolfFeedPlant = await FeedAnimals(wolf.address, 'plant')
  }catch(e){
    console.log("Wolves don`t eat plants")
  }
  console.log("---------------------------------------");
}

async function CallAnimals(address){
  return await farmer.call(address);
}

async function FeedAnimals(address,food){
  return await farmer.feed(address, food);
}
const Card = artifacts.require("Card");

module.exports = function(deployer){
    deployer.deploy(Card);
}
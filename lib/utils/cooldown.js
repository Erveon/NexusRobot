var cooldown = {};

var cooldownTime = 5000;
var hasCooldown = false;

cooldown.initiate = function() {
    if(!hasCooldown) {
        hasCooldown = true;
        setTimeout(function() {
            hasCooldown = false;
        }, cooldownTime);
    }
};

cooldown.hasCooldown = function() {
    return hasCooldown;
}

module.exports = cooldown;

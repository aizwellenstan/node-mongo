## Installation
TODO: Describe the installation process
## Usage
TODO: Write usage instructions
## Contributing
1. Install NodeJS
2. `sudo apt-get update`
3. `sudo apt-get install build-essential libssl-dev`
4. `sudo apt install curl`
5. `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
6. `sudo apt-get install -y nodejs`
7. `sudo apt install git`
8. `git clone http://220.128.216.143:9999/Aiz/ocms_garbage_macker.git`
9. `cd ocms_garbage_macker`
10. `npm i`
11. `sudo npm start`
## How to change API url?
1. edit ./api.js  
2. change   railsApi => rails port
3. change   alarmApi => alarm port
4. restart server `sudo npm start`
## How to change client port?
1. edit ./port.js
2. chage     
module.exports = {
  port: 80
}
3. restart server `sudo npm start`

# Must Add sudo infront of npm start to run at 80 port!
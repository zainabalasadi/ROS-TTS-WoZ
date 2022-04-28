# ROS Text-To-Speech Wizard-of-Oz System

## Setup
Clone the repository and navigate to the root of the project
```bash
source venv/bin/activate
```

Update the IP address of the webserver with the public IP of your virtual environment
```bash
python -m http.server
```

Run the ROSBridge websocket server
```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```

// import Vue from 'vue';

var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        ros: null,
        ws_address: 'ws://172.31.158.92:9090',
        logs: [],
        loading: false,
        topic: null,
        topic2: null,
        topic3: null,
        message: null,
        custom_speech: ''
    },

    methods: {
        connect: function() {
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })
            this.ros.on('connection', () => {
                this.connected = true
                this.logs.unshift('[' + (new Date()).toLocaleTimeString() + '] Connected.')
            })
            this.ros.on('error', (error) => {
                this.logs.unshift('[' + (new Date()).toLocaleTimeString() + '] Error connecting to websocket server: ${error}.')
            })
            this.ros.on('close', () => {
                this.connected = false
                this.logs.unshift('[' + (new Date()).toLocaleTimeString() + '] Connection to websocket server closed.')
            })
        },

        disconnect: function() {
            this.ros.close()
        },

        setTopic1: function() {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/speak',
                messageType: 'std_msgs/String',
            })
        },
        
        setTopic2: function() {
		this.topic2 = new ROSLIB.Topic({
            	ros: this.ros,
            	name: '/emotion',
            	messageType: 'std_msgs/Int16',
            })
        },
        
        setTopic3: function() {
		this.topic2 = new ROSLIB.Topic({
            	ros: this.ros,
            	name: '/movement',
            	messageType: 'std_msgs/Int16',
            })
        },
        
        sendSpeech: function(speech) {
            this.message = new ROSLIB.Message ({
                data: speech,
            })
            this.setTopic1()
            this.topic.publish(this.message)
            console.log(speech)
        },

        sendEmotion: function(emotion) {
            this.message = new ROSLIB.Message ({
                data: emotion,
            })
            this.setTopic2()
            this.topic2.publish(this.message)
            console.log(emotion)
        },
        
        sendMove: function(move) {
            this.message = new ROSLIB.Message ({
                data: move,
            })
            this.setTopic3()
            this.topic2.publish(this.message)
            console.log(move)
        },
    },
})

// export default app;
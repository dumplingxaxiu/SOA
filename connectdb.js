const mongoose = require('mongoose');

const connectionString = "mongodb+srv://user1:123Bonnam6789@cluster0.kzenlrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connect() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully');
        return true;
    } catch (e) {
        console.error('Connect failure: ' + e);
    }
}


(async () => {
    const isConnected = await connect();
    if (!isConnected) {
        console.log('Kết nối với cơ sở dữ liệu thất bại!');
    }
})();
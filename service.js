// Object.defineProperty(exports, "__esModule", {
//     value: true
// });

exports.Service = function(connection){

    this.connection = connection; 

    executeQuery = function(sql) {
        connection.query(sql, function (error, results, fields) {
            console.log(sql);
            if (error) throw error;
          });
    }
    
    initServer = function() {
        connection.connect();
        connection.query('SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = "people"', (error, results) => {
            
            if(results && results[0])
                this.executeQuery('DROP TABLE people');
    
            executeQuery('CREATE TABLE people(name VARCHAR(20) CHARACTER SET utf8);')
            executeQuery("INSERT INTO people(name) values ('Alexandre');")
        });
    }
    
    return this;
}
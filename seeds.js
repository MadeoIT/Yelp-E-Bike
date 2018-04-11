var mongoose = require('mongoose');
    EBike = require('./models/ebike');
    Post = require('./models/post');

    data = [
        {
            model: "Folding X",
            brand: "JOLT eBike",
            power: 250,
            picture: "https://electricbikereview.com/wp-content/assets/2017/12/jolt-ebike-folding-electric-bike-review-426x213-c-center.jpg" 
        },
        {
            model: "Rad Mini",
            brand: "Rad Power Bikes",
            power: 400,
            picture: "https://electricbikereview.com/wp-content/assets/2017/11/2018-rad-power-bikes-radmini-electric-bike-review-426x213-c-center.jpg" 
        }
    ]

function seedDB() {
    EBike.remove({}, function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("1 - DB cleared!")
        }
        data.forEach(function(seed){
            EBike.create(seed, function(err, data){
                if (err){
                    console.log(err);
                } else {
                    console.log("DB seeded");
                    Post.create(
                        {
                            text: "This ebike is great, I am based in Finland, is there any dealer?",
                            author: "Ville"
                        }, function (err, post) {
                            if (err) {
                                console.log(err);
                            } else {
                                data.posts.push(post);
                                data.save();
                                console.log("comment created");
                            }
                        });
                }
            });
        });  
    });
}

module.exports = seedDB;
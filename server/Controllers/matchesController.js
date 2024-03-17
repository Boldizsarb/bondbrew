import MatchModel from "../Models/matchesModel.js";



export const getLikes = async (req, res) => { // front end will vary who liked and who was liked

    const { usertoid} = req.body;
    const type = "like";
    
    try {
        const matches = await MatchModel.find({ usertoid: usertoid, type: type});
        res.json(matches);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMatches = async (req, res) => { // front end will vary who liked and who was liked
    
        const { userid} = req.body;
        const type = "match";
        
        try {
            const matches = await MatchModel.find({
                $or: [{ userfromid: userid }, { usertoid: userid }],
                type: type
            });
            res.json(matches);
        } catch (error) {
            res.json({ message: error.message });
        }
    }


export const createLike = async (req, res) => { // if the being liked person already liked the liker, then it's a match

    const { userfromid, usertoid } = req.body;
    const type = "like";
    
    try {
        // check for an existing 'like' from the user
        const existingLike = await MatchModel.findOne({

            $or: [
              // { userfromid: userfromid, usertoid: usertoid, type: type },
                { userfromid: usertoid, usertoid: userfromid, type: type }
            ] // if the being liked person already liked the liker, then it's a match
        });

        if (existingLike) { // if like exists, update the type to 'match'
            existingLike.type = "match"; 
            await existingLike.save();
            return res.status(200).json({ message: 'Like updated to match.', existingLike });
        }

        const newLike = new MatchModel({ userfromid, usertoid, type }); // if no like exists, create a new like
        await newLike.save();
        res.status(201).json(newLike);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const createDislike = async (req, res) => { // if the being liked person already liked the liker, then it's a match
    
        const { userfromid, usertoid } = req.body;
        const type = "dislike";
        
        try {
            const newDislike = new MatchModel({ userfromid, usertoid, type });
            await newDislike.save();
            res.status(201).json(newDislike);
        } catch (error) {
            res.status(500).json(error.message);
        }
};


export const extractMatches = async (req, res) => { // extracting all users that has been liked/disliked/matched by the current user
    const { userid } = req.body;
    try {
        const matches = await MatchModel.find({
            $or: [
                { userfromid: userid, type: "like" }, 
                { userfromid: userid, type: "dislike" },
                { userfromid: userid, type: "match" },
                { usertoid: userid, type: "match" } 
            ]
        }).select('userfromid usertoid type -_id'); 

        const result = matches.map(match => {
            // returning the opposite user ID to the userid based on the type of match
            if (match.type === 'like' && userid === match.userfromid) {
                return match.usertoid;

            } else if (match.type === 'match') {
                return userid === match.userfromid ? match.usertoid : match.userfromid;

            } else if (match.type === 'dislike' && userid === match.userfromid) {
                return match.usertoid; 
            }
        });

        res.json(result.filter(id => id !== undefined)); // if there is undifined, filter it out
    } catch (error) {
        res.json({ message: error.message });
    }
}





// export const extractMatches = async (req, res) => { 
//     const { userid } = req.body;
    
//     try {
//         const matches = await MatchModel.find({
//             $or: [
//                 { userfromid: userid, type: "like" },    // Matches where userid is the userfromid and type is "like"
//                 { userfromid: userid, type: "dislike" },
//                 { userfromid: userid, type: "match" },
//                 { usertoid: userid, type: "match" }
//             ]
//         }).select('usertoid -_id'); // select usertoid and exclude _id
//         res.json(matches.map(match => match.usertoid));
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }





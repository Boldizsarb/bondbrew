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


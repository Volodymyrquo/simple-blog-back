import PostModel from "../models/Post.js"

export const getLastTags = async (req,res)=>{
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags =  posts
        .map((obj)=>obj.tags)
        .flat()
        .slice(0,5);

        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({massage:"Cannot get tags"})
    
    }
    }

export const getAll = async (req,res)=>{
try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts)
} catch (error) {
    console.log(error)
    res.status(500).json({massage:"Cannot get posts"})

}
}
export const getOne = async (req,res)=>{
try {
    const postId = req.params.id
    const doc = await PostModel.findOneAndUpdate({
    _id:postId,
},{$inc:{viewCount:1}},
{returnDocument:'after'},
).populate('user').exec()
    if(!doc){
        return res.status(404).json({
            message:"Article not found"
        })
    }
    res.json(doc);


} catch (error) {
    console.log(error)
    res.status(500).json({massage:"Cannot get posts"})

}
}


export const remove = async (req,res)=>{
try {
    const postId = req.params.id
  const doc = await  PostModel.findOneAndDelete({
        _id: postId
    })

    if(!doc){
        return res.status(404).json({
            message:"Article not found"
        })
    }
    res.json({
        success:true
    })

} catch (error) {
    console.log(error)
    res.status(500).json({massage:"Cannot get posts"})

}
}

export const create = async (req,res)=>{
    try {
        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            tags:req.body.tags.split(','),
            user:req.userId
        });

        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({massage:"Cannot create post"})
   
    }
}

export const update = async(req,res)=>{
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id:postId
        },{ title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            tags:req.body.tags.split(','),
            user:req.userId})
            res.json({
                success:true
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({massage:"Cannot update article"})

    }
}

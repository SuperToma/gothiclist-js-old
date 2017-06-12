import mongoose, { Schema } from 'mongoose'

const artistSchema = new Schema({
    profile: { type: String },
    urls: { type: [String] },
    namevariations: { type: [String] },
    l_name: { type: String },
    name: { type: String },
    aliases: { type: [String] },
    members: { type: [String] },
    images: { type: [String] },
    updated_on: { type: Date },
    groups: { type: [String] },
    id: { type: Number },
    realname: { type: String }
})

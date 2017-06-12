import mongoose, { Schema } from 'mongoose'

const releaseSchema = new Schema({
    status: { type: String },
    styles: { type: [String] },
    genres: { type: [String] },
    artistJoins: [{
        artist_id: Number,
        join_relation: String,
        anv: String,
        artist_name: String
    }],
    extraartists: [{
        artist_id: Number,
        anv: String,
        artist_name: String
    }],
    title: { type: String },
    country: { type: String },
    notes: { type: String },
    released: { type: Date },
    l_artist: { type: String },
    updated_on: { type: Date },
    master_id: { type: Number },
    l_title: { type: String },
    id: { type: Number },
    tracklist: [{
        duration: String,
        position: String,
        artistJoins: [String],
        extraartists: [String],
        title: String
    }]
})
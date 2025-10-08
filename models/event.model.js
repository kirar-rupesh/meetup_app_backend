const mongoose = require ('mongoose');

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String , required: true }, 
  photo: { type: String , required: true}, 
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },                
  description: { type: String, required: true },    
  day : { type: String, required: true },      
  date: { type: Date, required: true },                   
  endDate: { type: Date },                                
  type: { type: String, enum: ['Online', 'Offline'], required: true }, 
  image: { type: String , required: true},                                
  venue: { type: String },                                
  address: { type: String },                              
  price: { type: Number, default: 0 },                    
  speakers: [SpeakerSchema],                              
  host: { type: String },                                 
  dressCode: { type: String },                            
  ageRestriction: { type: String },                       
  tags: [String],                                         
});

module.exports = mongoose.model('Event', EventSchema);

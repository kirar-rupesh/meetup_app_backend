const initializeDatabase = require("./db/db.connect.js");
const fs = require("fs");
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const Event = require("./models/event.model.js");

app.use(express.json());

initializeDatabase();

const jsonData = fs.readFileSync("./meetup.json", "utf-8");
const meetupData = JSON.parse(jsonData);

function seedData() {
  try {
    for (const eventData of meetupData) {
      const newEvent = new Event({
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        day: eventData.day,
        date: new Date(eventData.date),
        endDate: new Date(eventData.endDate),
        type: eventData.type,
        image: eventData.image,
        venue: eventData.venue,
        address: eventData.address,
        price: eventData.price,
        speakers: eventData.speakers,
        host: eventData.host,
        dressCode: eventData.dressCode,
        ageRestriction: eventData.ageRestriction,
        tags: eventData.tags,
      });
      console.log(newEvent.title);
      newEvent.save();
    }
  } catch (error) {
    console.log("Errrrrroooorrrrrrrrrrrr in connecting database", error);
  }
}

seedData();

// to get all the movies in the database
async function readAllEvents() {
  try {
    const allEvents = await Event.find();
    // console.log(allEvents)
    return allEvents;
  } catch (error) {
    console.log(error);
  }
}
// readAllMovies()
app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No Event Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Data" });
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

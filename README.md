# Over Engineered Snake

A simple but (Probably 🤷) over-engineered snake game in vanilla javascript.
Live at this https://rational-kunal.github.io/over-engineered-snake GitHub page.

This game was mainly developed to start learning about canvas and how we can create a game on it for the `js13k` challenge.

I am planning/hoping to design a new "Game Engine" with knowledge from this one, but with typescript, good documentation, and tests, in short, a better version of this one.

# Code structure

Following is the basic code structure used for this game.

- **core:**
  Used for game logic that is essential to run the game.
  - `Engine`: Manages "starting game", "game tick", "drawing".
- **framework:**
  Base classes for entities used by `Engine` are used for implementing the game.
  - `Frame`: Defines dimensions.
  - `Entity`: The base class that is used for drawing.
  - `CollidableEntity`: Entity that supports collision detection.
  - `EntityController`: Business logic of entity.
- **snake:**
  Implementation of base classes to support snake game.
  - `RootEntityController`: As the name suggests, it manages every other controller and is passed to the engine. This controller has instances of other child controllers.
  - `SnakeEntityController`: Logic to manage snake and event handling related to a snake, like "game over" after the snake collides with itself.
  - `PowerEntityController`: Logic to handle power-ups and create a new power entity that does not collide with any other entities.
  - `scoreManager`: Singleton score manager to count the current and high scores.
  - `htmlManger`: Singleton HTML manager to update DOM elements as required.

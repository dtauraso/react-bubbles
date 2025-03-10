import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [makeNewColor, setMakeNewColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, color) => {
    e.preventDefault();
    // console.log(color)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => {
        console.log(res.data)
        updateColors(colors.map(color => {

          return color.id === res.data.id ? res.data : color
        }))
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        // console.log(res.data)
        updateColors(colors.filter(color => color.id !== res.data))

      })
      .catch(err => {
        console.log(err)
      })
  };
  const addColor = (e, color) => {
    e.preventDefault()
    console.log("adding color")
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, color)
      .then(res => {
        console.log(res)
        updateColors(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={(e) => {saveEdit(e, colorToEdit)}}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div className="button-row">
          <button onClick={() => setMakeNewColor(true)}>Make New Color</button>
      </div>

      {makeNewColor &&
      <form onSubmit={(e) => {addColor(e, colorToAdd)}}>
        <legend>add color</legend>
          <label>
              color name:
              <input
                onChange={e =>
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
                }
                value={colorToAdd.color}
              />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save color</button>
            <button onClick={() => setMakeNewColor(false)}>cancel</button>
        </div>
      </form>
      }
    </div>
  );
};

export default ColorList;

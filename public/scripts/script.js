function addNoteInput() {
  var note = document.createElement('input');
  note.type = "text";
  note.name = "notes";
  note.id = "notes";
  note.className="form-control";
  note.placeholder="Note"; 
  document.getElementById("notes-div").appendChild(note);  
}

function deleteNoteInput(obj) {
  const element = document.getElementById("notes");
  element.remove();
}
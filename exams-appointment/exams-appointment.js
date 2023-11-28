// man = منهج
// mus = مستوى

function confirmAppointment(studentId, man, mus) {
  var examDate = document.getElementById(
    "examDate" + studentId + man + mus
  ).value;
  var examTime = document.getElementById(
    "examTime" + studentId + man + mus
  ).value;
  var inAppointment = document.getElementById(
    "inAppointment" + studentId + man + mus
  );

  if (examDate && examTime) {
    //   TODO: send exam appontment to the database
    console.log({ studentId, man, mus, examDate, examTime });

    //   CLOSE
    close_appointment_modal(studentId, man, mus);

    // SHOWING APPOINTMENT
    var date = document.createElement("span");
    date.innerHTML = examDate;

    var time = document.createElement("span");
    time.innerHTML = examTime;

    inAppointment.innerHTML = "";
    inAppointment.appendChild(date);
    inAppointment.appendChild(time);
  } else {
    alert("فضلا! يرجى إختيار تاريخ وووقت الإختبار.");
  }
}

function sendExecuse(studentId, man, mus) {
  var studentExecuse = document.getElementById(
    "studentExecuse" + studentId + man + mus
  ).value;
  var inExecuse = document.getElementById("inExecuse" + studentId + man + mus);

  if (studentExecuse) {
    //   TODO: send exam execuse to the database
    console.log({ studentId, man, mus, studentExecuse });

    //   CLOSE
    close_execuse_modal(studentId, man, mus);

    // SHOWING EXECUSE
    var execuse = document.createElement("span");
    execuse.classList.add("ms-2");
    execuse.textContent = "معتذرة";

    var unexecuseButton = document.createElement("button");
    unexecuseButton.classList.add("btn", "btn-primary", "btn-sm");
    unexecuseButton.textContent = "إلغاء الإعتذار";
    unexecuseButton.onclick = () => unexecuse(studentId, man, mus);
    inExecuse.innerHTML = "";
    inExecuse.appendChild(execuse);
    inExecuse.appendChild(unexecuseButton);
  } else {
    alert("فضلا! يرجى كتابة سبب الإعتذار من الإختبار.");
  }
}

function close_appointment_modal(studentId, man, mus) {
  var examAppointment = document.getElementById(
    "examAppointment" + studentId + man + mus
  );

  if (bootstrap.Modal.getInstance(examAppointment)._isShown) {
    // If visible, close the modal
    bootstrap.Modal.getInstance(examAppointment).hide();
  }
}

function close_execuse_modal(studentId, man, mus) {
  var examExecuse = document.getElementById(
    "examExecuse" + studentId + man + mus
  );

  if (bootstrap.Modal.getInstance(examExecuse)._isShown) {
    // If visible, close the modal
    bootstrap.Modal.getInstance(examExecuse).hide();
  }
}

function unexecuse(studentId, man, mus) {
  var inExecuse = document.getElementById("inExecuse" + studentId + man + mus);

  // div
  var div = document.createElement("div");
  div.id = "inAppointment" + studentId + man + mus;
  div.classList.add("d-inline");

  // زر حجز موعد
  var appointment = document.createElement("button");
  appointment.classList.add("btn", "btn-primary", "btn-sm");
  appointment.setAttribute("data-bs-toggle", "modal");
  appointment.setAttribute(
    "data-bs-target",
    "#examAppointment" + studentId + man + mus
  );
  appointment.textContent = "تحديد موعد";

  // إعتذار
  var execuse = document.createElement("button");
  execuse.classList.add("btn", "btn-outline-danger", "btn-sm");
  execuse.setAttribute("data-bs-toggle", "modal");
  execuse.setAttribute(
    "data-bs-target",
    "#examExecuse" + studentId + man + mus
  );
  execuse.textContent = "إعتذار";

  div.appendChild(appointment);
  inExecuse.innerHTML = "";
  inExecuse.appendChild(div);
  inExecuse.appendChild(execuse);
}

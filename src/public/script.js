const addButton = document.getElementById('add-contact');

const addContact = () => {
  const contactName = document.getElementById('contact-name').value;
  const contactNumber = document.getElementById('contact-number').value;
  const contacts = document.getElementById('contacts');
  contacts.innerHTML += `<a href="${window.location.pathname + '/chatWith/' + contactNumber}" ><strong>Nome: ${contactName}</strong> Phone: ${contactNumber}</a>`;
  console.log(window.location);
};

addButton.addEventListener('click', addContact);
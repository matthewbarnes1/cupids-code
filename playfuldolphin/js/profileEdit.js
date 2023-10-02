const newFormHandler = async (event) => {
  event.preventDefault();

  const firstname = document.querySelector('#first-name').value.trim();
  const age = document.querySelector('#age').value.trim();
  const bio = document.querySelector('#profile-bio').value.trim();
  const hobbies = document.querySelector('#profile-hobbies').value.trim();

  if (firstname && age && bio) {
    const response = await fetch(`/api/profile/update`, {
      method: 'POST',
      body: JSON.stringify({ firstname, age, bio, hobbies}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    if (response.ok) {
      document.location.replace('/matches');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);


const newFormHandler = async (event) => {
  event.preventDefault();

  const firstname = document.querySelector('#first-name').value.trim();
  const age = document.querySelector('#age').value.trim();
  const bio = document.querySelector('#profile-bio').value.trim();
  const hobbies = document.querySelector('#profile-hobbies').value.trim();
  console.log('Submit form')


  if(firstname && age && bio){
    console.log('true')
  }else{
    console.log('false')
  }
  
  if (firstname && age && bio) {
    const response = await fetch(`/api/profile/create`, {
      method: 'POST',
      body: JSON.stringify({ firstname, age, bio, hobbies}),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    document.location.replace('/matches');
  

    if (response.ok) {
      document.location.replace('/login');
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

console.log('zxvzxcvzxcvzxcvzxcv')


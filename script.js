const loginView=document.getElementById('loginView');
const dashboardView=document.getElementById('dashboardView');
const loginForm=document.getElementById('loginForm');
const errorBox=document.getElementById('errorBox');
const logoutBtn=document.getElementById('logoutBtn');
const userName=document.getElementById('userName');
const userRole=document.getElementById('userRole');
const roleLabel=document.getElementById('roleLabel');

const registrationCard=document.getElementById('registrationCard');
const registrationModal=document.getElementById('registrationModal');
const closeRegistration=document.getElementById('closeRegistration');
const registrationForm=document.getElementById('registrationForm');
const clearRegistration=document.getElementById('clearRegistration');
const regName=document.getElementById('regName');
const regEmail=document.getElementById('regEmail');
const regPhone=document.getElementById('regPhone');
const regPlan=document.getElementById('regPlan');
const nameError=document.getElementById('nameError');
const regEmailError=document.getElementById('regEmailError');
const phoneError=document.getElementById('phoneError');
const planError=document.getElementById('planError');
const registrationSummary=document.getElementById('registrationSummary');
const registrationSuccess=document.getElementById('registrationSuccess');

const users={
  'admin@gym.com':{password:'admin123',name:'Admin User',role:'Administrator'},
  'member@gym.com':{password:'member123',name:'Member User',role:'Member'}
};

loginForm.addEventListener('submit',function(e){
  e.preventDefault();
  const email=document.getElementById('email').value.trim().toLowerCase();
  const password=document.getElementById('password').value;
  if(users[email]&&users[email].password===password){
    errorBox.textContent='';
    userName.textContent=users[email].name;
    userRole.textContent=users[email].role;
    roleLabel.textContent=users[email].role+' Dashboard';
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
  }else{
    errorBox.textContent='Invalid email or password. Please try again.';
  }
});

logoutBtn.addEventListener('click',function(){
  dashboardView.classList.add('hidden');
  loginView.classList.remove('hidden');
  loginForm.reset();
  errorBox.textContent='';
  closeRegistrationModal();
});

function openRegistrationModal(){
  registrationModal.classList.remove('hidden');
  registrationModal.setAttribute('aria-hidden','false');
  clearValidation();
  setTimeout(()=>regName.focus(),50);
}

function closeRegistrationModal(){
  registrationModal.classList.add('hidden');
  registrationModal.setAttribute('aria-hidden','true');
}

registrationCard.addEventListener('click',openRegistrationModal);
registrationCard.addEventListener('keydown',function(e){
  if(e.key==='Enter'||e.key===' '){e.preventDefault();openRegistrationModal();}
});
closeRegistration.addEventListener('click',closeRegistrationModal);
registrationModal.addEventListener('click',function(e){
  if(e.target===registrationModal)closeRegistrationModal();
});

function clearValidation(){
  [regName,regEmail,regPhone,regPlan].forEach(el=>el.classList.remove('input-invalid'));
  [nameError,regEmailError,phoneError,planError].forEach(el=>el.textContent='');
  registrationSummary.classList.add('hidden');
  registrationSummary.textContent='';
  registrationSuccess.classList.add('hidden');
}

clearRegistration.addEventListener('click',function(){
  registrationForm.reset();
  clearValidation();
  regName.focus();
});

registrationForm.addEventListener('submit',function(e){
  e.preventDefault();
  clearValidation();
  const errors=[];
  const name=regName.value.trim();
  const email=regEmail.value.trim();
  const phone=regPhone.value.trim();
  const plan=regPlan.value;

  if(!name){
    nameError.textContent='Full name is required.';
    regName.classList.add('input-invalid');
    errors.push('Full name is required');
  }

  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email){
    regEmailError.textContent='Email is required.';
    regEmail.classList.add('input-invalid');
    errors.push('Email is required');
  }else if(!emailPattern.test(email)){
    regEmailError.textContent='Enter a valid email address.';
    regEmail.classList.add('input-invalid');
    errors.push('Valid email is required');
  }

  const phonePattern=/^[6-9]\d{9}$/;
  if(!phone){
    phoneError.textContent='Phone number is required.';
    regPhone.classList.add('input-invalid');
    errors.push('Phone number is required');
  }else if(!phonePattern.test(phone)){
    phoneError.textContent='Enter a valid 10-digit phone number.';
    regPhone.classList.add('input-invalid');
    errors.push('Valid 10-digit phone number is required');
  }

  if(!plan){
    planError.textContent='Please select a membership plan.';
    regPlan.classList.add('input-invalid');
    errors.push('Membership plan is required');
  }

  if(errors.length){
    registrationSummary.textContent='Validation failed: Please correct the highlighted fields before registration.';
    registrationSummary.classList.remove('hidden');
    registrationSuccess.classList.add('hidden');
    return;
  }

  registrationSuccess.textContent='Member registered successfully. All validation checks passed.';
  registrationSuccess.classList.remove('hidden');
  registrationSummary.classList.add('hidden');
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&!registrationModal.classList.contains('hidden'))closeRegistrationModal();
});
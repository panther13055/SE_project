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
  if(typeof closePaymentModal==='function') closePaymentModal();
  if(typeof closeAttendanceModal==='function') closeAttendanceModal();
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
const paymentCard=document.getElementById('paymentCard');
const paymentModal=document.getElementById('paymentModal');
const closePayment=document.getElementById('closePayment');
const paymentForm=document.getElementById('paymentForm');
const clearPayment=document.getElementById('clearPayment');

const payName=document.getElementById('payName');
const payMemberId=document.getElementById('payMemberId');
const payPlan=document.getElementById('payPlan');
const payAmount=document.getElementById('payAmount');
const payMethod=document.getElementById('payMethod');

const payNameError=document.getElementById('payNameError');
const payMemberIdError=document.getElementById('payMemberIdError');
const payPlanError=document.getElementById('payPlanError');
const payAmountError=document.getElementById('payAmountError');
const payMethodError=document.getElementById('payMethodError');
const paymentValidation=document.getElementById('paymentValidation');
const receiptBox=document.getElementById('receiptBox');

function openPaymentModal(){
  paymentModal.classList.remove('hidden');
  paymentModal.setAttribute('aria-hidden','false');
  clearPaymentState();
  setTimeout(()=>payName.focus(),50);
}

function closePaymentModal(){
  paymentModal.classList.add('hidden');
  paymentModal.setAttribute('aria-hidden','true');
}

function clearPaymentState(){
  [payName,payMemberId,payPlan,payAmount,payMethod].forEach(el=>el.classList.remove('input-invalid'));
  [payNameError,payMemberIdError,payPlanError,payAmountError,payMethodError].forEach(el=>el.textContent='');
  paymentValidation.classList.add('hidden');
  paymentValidation.textContent='';
  receiptBox.classList.add('hidden');
}

paymentCard.addEventListener('click',openPaymentModal);
paymentCard.addEventListener('keydown',function(e){
  if(e.key==='Enter'||e.key===' '){e.preventDefault();openPaymentModal();}
});
closePayment.addEventListener('click',closePaymentModal);
paymentModal.addEventListener('click',function(e){
  if(e.target===paymentModal)closePaymentModal();
});

clearPayment.addEventListener('click',function(){
  paymentForm.reset();
  clearPaymentState();
  payName.focus();
});

paymentForm.addEventListener('submit',function(e){
  e.preventDefault();
  clearPaymentState();
  let hasError=false;

  const name=payName.value.trim();
  const memberId=payMemberId.value.trim().toUpperCase();
  const plan=payPlan.value;
  const amount=Number(payAmount.value);
  const method=payMethod.value;

  if(!name){
    payNameError.textContent='Member name is required.';
    payName.classList.add('input-invalid');
    hasError=true;
  }

  if(!/^GYM-\d{3,}$/.test(memberId)){
    payMemberIdError.textContent='Enter a valid Member ID (e.g. GYM-101).';
    payMemberId.classList.add('input-invalid');
    hasError=true;
  }

  if(!plan){
    payPlanError.textContent='Please select a membership plan.';
    payPlan.classList.add('input-invalid');
    hasError=true;
  }

  if(!amount || amount<=0){
    payAmountError.textContent='Enter a valid payment amount.';
    payAmount.classList.add('input-invalid');
    hasError=true;
  }

  if(!method){
    payMethodError.textContent='Please select a payment method.';
    payMethod.classList.add('input-invalid');
    hasError=true;
  }

  if(hasError){
    paymentValidation.textContent='Payment validation failed: Please correct the highlighted fields.';
    paymentValidation.classList.remove('hidden');
    return;
  }

  const receiptId='RCPT-'+String(Math.floor(1000+Math.random()*9000));
  const transactionId='TXN'+Date.now().toString().slice(-8);

  document.getElementById('receiptId').textContent=receiptId;
  document.getElementById('receiptName').textContent=name;
  document.getElementById('receiptMemberId').textContent=memberId;
  document.getElementById('receiptPlan').textContent=plan;
  document.getElementById('receiptAmount').textContent='₹'+amount.toLocaleString('en-IN');
  document.getElementById('receiptMethod').textContent=method;
  document.getElementById('transactionId').textContent=transactionId;
  receiptBox.classList.remove('hidden');
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&!paymentModal.classList.contains('hidden'))closePaymentModal();
});

const attendanceCard=document.getElementById('attendanceCard');
const attendanceModal=document.getElementById('attendanceModal');
const closeAttendance=document.getElementById('closeAttendance');
const attendanceForm=document.getElementById('attendanceForm');
const clearAttendance=document.getElementById('clearAttendance');

const attendanceMemberId=document.getElementById('attendanceMemberId');
const attendanceMemberName=document.getElementById('attendanceMemberName');
const attendanceType=document.getElementById('attendanceType');
const attendanceMemberError=document.getElementById('attendanceMemberError');
const attendanceNameError=document.getElementById('attendanceNameError');
const attendanceTypeError=document.getElementById('attendanceTypeError');
const attendanceValidation=document.getElementById('attendanceValidation');
const attendanceSuccess=document.getElementById('attendanceSuccess');

function openAttendanceModal(){
  attendanceModal.classList.remove('hidden');
  attendanceModal.setAttribute('aria-hidden','false');
  clearAttendanceState();
  setTimeout(()=>attendanceMemberId.focus(),50);
}

function closeAttendanceModal(){
  attendanceModal.classList.add('hidden');
  attendanceModal.setAttribute('aria-hidden','true');
}

function clearAttendanceState(){
  [attendanceMemberId,attendanceMemberName,attendanceType].forEach(el=>el.classList.remove('input-invalid'));
  [attendanceMemberError,attendanceNameError,attendanceTypeError].forEach(el=>el.textContent='');
  attendanceValidation.classList.add('hidden');
  attendanceValidation.textContent='';
  attendanceSuccess.classList.add('hidden');
}

attendanceCard.addEventListener('click',openAttendanceModal);
attendanceCard.addEventListener('keydown',function(e){
  if(e.key==='Enter'||e.key===' '){e.preventDefault();openAttendanceModal();}
});
closeAttendance.addEventListener('click',closeAttendanceModal);
attendanceModal.addEventListener('click',function(e){
  if(e.target===attendanceModal)closeAttendanceModal();
});

clearAttendance.addEventListener('click',function(){
  attendanceForm.reset();
  clearAttendanceState();
  attendanceMemberId.focus();
});

attendanceForm.addEventListener('submit',function(e){
  e.preventDefault();
  clearAttendanceState();

  const memberId=attendanceMemberId.value.trim().toUpperCase();
  const memberName=attendanceMemberName.value.trim();
  const type=attendanceType.value;
  let hasError=false;

  if(!/^GYM-\d{3,}$/.test(memberId)){
    attendanceMemberError.textContent='Enter a valid Member ID (e.g. GYM-101).';
    attendanceMemberId.classList.add('input-invalid');
    hasError=true;
  }

  if(!memberName){
    attendanceNameError.textContent='Member name is required.';
    attendanceMemberName.classList.add('input-invalid');
    hasError=true;
  }

  if(!type){
    attendanceTypeError.textContent='Please select an attendance type.';
    attendanceType.classList.add('input-invalid');
    hasError=true;
  }

  if(hasError){
    attendanceValidation.textContent='Attendance validation failed: Please correct the highlighted fields.';
    attendanceValidation.classList.remove('hidden');
    return;
  }

  const now=new Date();
  document.getElementById('attendanceResultId').textContent=memberId;
  document.getElementById('attendanceResultName').textContent=memberName;
  document.getElementById('attendanceResultType').textContent=type;
  document.getElementById('attendanceResultDate').textContent=now.toLocaleDateString('en-IN');
  document.getElementById('attendanceResultTime').textContent=now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  attendanceSuccess.classList.remove('hidden');
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&!attendanceModal.classList.contains('hidden'))closeAttendanceModal();
});

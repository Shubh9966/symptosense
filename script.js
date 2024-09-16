
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/samirangupta31/MedicalTranscripts",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
document.getElementById('voice-input-button').addEventListener('click', startVoiceInput);
document.getElementById('classify-button').addEventListener('click', classifySymptoms);
document.getElementById('send-button').addEventListener('click', sendMessage);
function classifySymptoms() {
    const symptoms = document.getElementById("symptoms").value;
    query({ "inputs": symptoms }).then((response) => {
        displayResult(response[0]);
    }).catch((error) => {
        console.error("Error:", error);
    });
}

function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";

    const labels = [
        'Emotional pain', 'Back pain', 'Joint pain', 'Infected wound', 'Foot ache',
        'Shoulder pain', 'Injury from sports', 'Skin issue', 'Stomach ache', 'Knee pain',
        'Heart hurts', 'Hard to breath', 'Head ache', 'Body feels weak', 'Feeling dizzy',
        'Open wound', 'Internal pain', 'Blurry vision', 'Acne', 'Muscle pain',
        'Hair falling out', 'Neck pain', 'Cough', 'Ear ache', 'Feeling cold'
    ];

    if (result && result.length > 0) {
        const topThree = result.slice(0, 3);

        const doctorsMap = {
            1: [
                { name: "Rajesh Rathi (Psychatrist)", link: "https://www.apexclinicngp.com/" },
                { name: "Synapse mind care", link: "https://synapsemindcare.com/" },
                { name: "Mind Roots The Holistic Clinic", link: "https://mindrootsclinic.com/" }
            ],
            2: [
                { name: "Romil Rathi (Orthopedist)", link: "https://www.drromilrathi.com/" },
                { name: "Dr Sanjay Barik (Orthopedist)", link: "https://www.drbariksorthocare.in/" },
                { name: "Sushrut Hospital (Orthopedist)", link: "http://www.simsnagpur.com/" }
            ],
            3: [
                { name: "Romil Rathi (Orthopedist)", link: "https://www.drromilrathi.com/" },
                { name: "Dr Sanjay Barik (Orthopedist)", link: "https://www.drbariksorthocare.in/" },
                { name: "Sushrut Hospital (Orthopedist)", link: "http://www.simsnagpur.com/" }
            ],
            4: [
                { name: "Dr Syed Tarique (General Doctor)", link: "https://synergyhospitalnagpur.com/our-doctors/dr-syed-tarique/" },
                { name: "Dr Vina Bang (General Doctor)", link: "https://drvinabang.com/" },
                { name: "Dr Aishwarya Joshi (General Doctor)", link: "https://www.askapollo.com/doctors/general-physician/nagpur/dr-aishwarya-joshi" }
            ],
            5: [
                { name: "Dr Girish Motwani (Orthopedic)", link: "https://www.drgirishmotwani.com/foot-ankle-surgeon" },
                { name: "Dr Romil Rathi (Orthopedist)", link: "https://www.drromilrathi.com/" },
                { name: "Dr Nawaid Ahmed (Orthopedic)", link: "https://drnawaidahmed.com/" }
            ],
            6: [
                { name: "Romil Rathi (Orthopedist)", link: "https://www.drromilrathi.com/" },
                { name: "Dr Sanjay Barik (Orthopedist)", link: "https://www.drbariksorthocare.in/" },
                { name: "Sushrut Hospital (Orthopedist)", link: "http://www.simsnagpur.com/" }
            ],
            7: [
                { name: "Romil Rathi (Orthopedist)", link: "https://www.drromilrathi.com/" },
                { name: "Dr Sanjay Barik (Orthopedist)", link: "https://www.drbariksorthocare.in/" },
                { name: "Sushrut Hospital (Orthopedist)", link: "http://www.simsnagpur.com/" }
            ],
            8: [
                { name: "Dr Sandeep Aggrawal (Dermatologist)", link: "#" },
                { name: "Dr Anshul Jain (Dermatologist)", link: "https://www.practo.com/nagpur/doctor/dr-anshul-jain-dermatologist-cosmetologist1" },
                { name: "Dr Neha Rathi (Dermatologist)", link: "https://www.practo.com/nagpur/doctor/dr-neha-rajesh-rathi-dermatologist" }
            ],
            9: [
                { name: "Dr Prakash B Sonkusare (Gastroenterologist)", link: "https://www.google.com/aclk?sa=l&ai=DChcSEwjUy5-RmrKFAxUD1RYFHXbmDQgYABAGGgJ0bA&ase=2&gclid=Cj4KCQjwq86wBhDiARItAJhuphkU5-wnA8HHBkK_LU5a86WxrIpowx_0J51bw-NS2tZeJRq_UY43UtozGgKDDBAC8P8HAQ&label=free_ps_website&sig=AOD64_1DkTRgu9ZLVKVY3dma0mTSCpW_KA&bp=1&nis=4&adurl" },
                { name: "Dr Manish Upwanshi (Gastroenterologist)", link: "https://www.drmanishupwanshi.com/" },
                { name: "Dr Prashant Bhowate (Gastroenterologist)", link: "https://www.carehospitals.com/doctor/nagpur/prashant-dayalrao-bhowate-gastroenterologist" }
            ],
            10: [
                { name: "Dr Akash Khune (Orthopedist)", link: "https://www.drakashkhune.com/" },
                { name: "Dr Parikshit Sagdeo (Rheumatologist)", link: "http://www.arthritisspecialist.in/" },
                { name: "Dr Tanmay Gandhi (General Doctor)", link: "http://www.immunocare.co.in/" }
            ],
            11: [
                { name: "Dr Manish Juneja (Cardiologist)", link: "https://www.bing.com/ck/a?!&&p=aa8cbeffcbc91b72JmltdHM9MTcxMjYyMDgwMCZpZ3VpZD0xNWRhYmQ5Yi1iMzU3LTY5NjAtMzRjYi1hZDdhYjJjYzY4YmEmaW5zaWQ9NTQ3NQ&ptn=3&ver=2&hsh=3&fclid=15dabd9b-b357-6960-34cb-ad7ab2cc68ba&u=a1aHR0cHM6Ly93d3cuYmluZy5jb20vYWxpbmsvbGluaz91cmw9aHR0cHMlM2ElMmYlMmZyaHl0aG1ob3NwaXRhbHMuY29tJTJmJnNvdXJjZT1zZXJwLWxvY2FsJmg9dyUyYlVWWU5YRWdhb2FJZ1E4NWFwa0RqcHd4UDZOUVolMmZzZ0JlUXY4QjlpNjQlM2QmcD1sd19nYiZpZz1BQjM1NDBBQzI0Mzg0MkRBOTk2MDY5QkU2MjNDN0ZBNCZ5cGlkPVlONDA3MHg1ODk1NDEyMTgwMDQ3NDIzMTg3&ntb=1" },
                { name: "Dr Chetan Rathi (Cardiologist)", link: "https://www.drchetanrathi.com/cardiologist-in-nagpur/" },
                { name: "Dr Sumedh Ramteke (Cardiologist)", link: "https://www.drsumedhramteke.in/" }
            ],
            12: [
                { name: "Dr Syed Tarique (Pulmonologist)", link: "https://synergyhospitalnagpur.com/our-doctors/dr-syed-tarique/" },
                { name: "Dr Sameer Lote (Pulmonologist)", link: "https://panaceaclinic.org/about/" },
                { name: "Dr Deepak Muthreja (Pulmonologist)", link: "https://americanoncology.com/top-cancer-specialists-doctors-in-india/top-cancer-specialists-in-nagpur/" }
            ],
            13: [
                { name: "Dr Chandrashekhar Pakhmode (Neurologist)", link: "https://www.neuronnagpur.com/" },
                { name: "Dr Prateek Uttarwar (Neurologist)", link: "http://dr-pratikuttarwar.in/" },
                { name: "Dr Kedar Takalkar (Neurologist)", link: "https://neuralay.in/" }
            ],
            14: [
                { name: "Dr Yogesh Dhoble (General Practitioner)", link: "https://dryogeshbdhoble.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" },
                { name: "Dr Vaibhav Gopaldas Aggrawal (General Practitioner)", link: "http://drvaibhavagrawal.com/" },
                { name: "Dr Suresh Jain (General Practitioner)", link: "https://drsureshjain.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" }
            ],
            15: [
                { name: "Dr Chandrashekhar Pakhmode (Neurologist)", link: "https://www.neuronnagpur.com/" },
                { name: "Dr Prateek Uttarwar (Neurologist)", link: "http://dr-pratikuttarwar.in/" },
                { name: "Dr Kedar Takalkar (Neurologist)", link: "https://neuralay.in/" }
            ],
            16: [
                { name: "SevenStar Hospital (General Practitioner)", link: "http://sevenstarhospitals.com/" },
                { name: "Dr Rohit Gupta (General Practitioner)", link: "https://www.vascular-surgeon.co.in/" },
                { name: "Dr Pravin Nikhade (General Practitioner)", link: "https://drpravin84.wixsite.com/nikhadepolyclinic" }
            ],
            17: [
                { name: "Dr Yogesh Dhoble (General Practitioner)", link: "https://dryogeshbdhoble.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" },
                { name: "Dr Vaibhav Gopaldas Aggrawal (General Practitioner)", link: "http://drvaibhavagrawal.com/" },
                { name: "Dr Suresh Jain (General Practitioner)", link: "https://drsureshjain.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" }
            ],
            18: [
                { name: "Netram Eye Hospital (Ophthalmologist)", link: "http://netramhospital.com/" },
                { name: "Venkatesh Retina and Eye Care (Ophthalmologist)", link: "http://www.cometeyehospitals.com/" },
                { name: "Anantwar Eye Hospital (Ophthalmologist)", link: "https://www.eyehospitalnearme.co.in/" }
            ],
            19: [
                { name: "Dr Anshul Jain (Dermatologist)", link: "https://www.practo.com/nagpur/doctor/dr-anshul-jain-dermatologist-cosmetologist1" },
                { name: "Dr Neha Rathi (Dermatologist)", link: "https://www.practo.com/nagpur/doctor/dr-neha-rajesh-rathi-dermatologist" }
            ],
            20: [
                { name: "Dr Akash Khune (Orthopedist)", link: "https://www.drakashkhune.com/" },
                { name: "Dr Parikshit Sagdeo (Rheumatologist)", link: "http://www.arthritisspecialist.in/" },
                { name: "Dr Tanmay Gandhi (General Doctor)", link: "http://www.immunocare.co.in/" }
            ],
            21: [
                { name: "Dr Himanshu Patil (Dermatologist)", link: "https://drhimanshupatil.com/" },
                { name: "Dr Pooja Jadhao (Dermatologist)", link: "https://www.facebook.com/profile.php?id=61557294951047" },
                { name: "Dr Vina Bang (General Doctor)", link: "https://drvinabang.com/" }
            ],
            22: [
                { name: "Dr Sneha Goyadani (Chiropractor)", link: "https://www.feelgoodpainclinic.com/" },
                { name: "Osteo Rehab Curve’s Physiotherapy (Physiotherapist)", link: "http://physiotherapynagpur.com/" },
                { name: "SureCare Miracle Chiro Spine Center (Chiropractor)", link: "http://www.surecarepileshospital.in/" }
            ],
            23: [
                { name: "Dr Syed Tarique (Pulmonologist)", link: "https://synergyhospitalnagpur.com/our-doctors/dr-syed-tarique/" },
                { name: "Dr Sameer Lote (Pulmonologist)", link: "https://panaceaclinic.org/about/" },
                { name: "Dr Deepak Muthreja (Pulmonologist)", link: "https://americanoncology.com/top-cancer-specialists-doctors-in-india/top-cancer-specialists-in-nagpur/" }
            ],
            24: [
                { name: "Dr Darakshan Praveen (Otolaryngologist)", link: "https://drdarakshanent.com/" },
                { name: "Dr Minal Pasari (General Practitioner)", link: "https://www.indriyahospital.com/" },
                { name: "Dr Rachna Gangwani Mahajan (Otolaryngologist)", link: "https://www.brainandentspecialist.in/" }
            ],
            25: [
                { name: "Dr Yogesh Dhoble (General Practitioner)", link: "https://dryogeshbdhoble.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" },
                { name: "Dr Vaibhav Gopaldas Aggrawal (General Practitioner)", link: "http://drvaibhavagrawal.com/" },
                { name: "Dr Suresh Jain (General Practitioner)", link: "https://drsureshjain.getmy.clinic/?utm_source=gmb&utm_medium=web&utm_campaign=tu" }
            ]
        };
        
        

        topThree.forEach((prediction, index) => {
            const labelIndex = parseInt(prediction.label.split('_')[1]); // Extracting the index from the label
            const symptom = labels[labelIndex]; // Getting the symptom from labels array
            const probability = (prediction.score * 100).toFixed(2);

            const probabilityElement = document.createElement("div");
            probabilityElement.classList.add("probability");
            probabilityElement.innerHTML = `
                <span class="probability-label">Probability ${index + 1}: ${symptom}</span>
                <span class="probability-score">${probability}%</span>
            `;

            const doctors = doctorsMap[labelIndex+1] || [];
            probabilityElement.addEventListener("click", () => displayDoctors(doctors));
            resultElement.appendChild(probabilityElement);
        });
    } else {
        resultElement.innerHTML = "<p>No result found.</p>";
    }
}

function displayDoctors(doctors) {
    const doctorsListDiv = document.getElementById("doctor-list");
    doctorsListDiv.innerHTML = "";

    if (doctors.length > 0) {
        const doctorsList = document.createElement("ul");

        doctors.forEach(doctor => {
            const doctorItem = document.createElement("li");
            const doctorLink = document.createElement("a");
            doctorLink.href = doctor.link;
            doctorLink.textContent = doctor.name;
            doctorLink.target = "_blank";
            doctorItem.appendChild(doctorLink);
            doctorsList.appendChild(doctorItem);
        });

        doctorsListDiv.appendChild(doctorsList);
    } else {
        const noDoctorsMsg = document.createElement("p");
        noDoctorsMsg.textContent = "No doctors found for this symptom.";
        doctorsListDiv.appendChild(noDoctorsMsg);
    }

    const modal = document.getElementById("doctorModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("doctorModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("doctorModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

async function translateText(text, targetLang = 'en') {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURI(text)}`);
    const translationData = await response.json();
    return translationData[0][0][0]; // Extracting translated text from API response
}

function startVoiceInput() {
    document.getElementById('symptoms').value = ''; // Clear the text area
    
    // Get the selected language from the dropdown
    const selectedLang = document.getElementById('language-select').value;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLang; // Use the selected language

    recognition.onresult = async function(event) {
        const transcript = event.results[0][0].transcript;
        console.log(`Detected language: ${selectedLang}`);
        
        // Translate the transcript to English
        const translatedText = await translateText(transcript, 'en');
        
        // Display both the original and translated text in the same textarea
        document.getElementById('symptoms').value = `Original: ${transcript}\nTranslated: ${translatedText}`;
    };

    recognition.onerror = function(event) {
        console.log(`Recognition failed for ${selectedLang}`);
    };

    recognition.start();
}

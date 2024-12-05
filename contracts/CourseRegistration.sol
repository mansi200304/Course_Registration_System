// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseRegistration {

    // Struct to store student details
    struct Student {
        string name;
        uint age;
        string dob;
        string location;
        string aadharCard;
        uint abaCredits;
        string email;
        string phoneNumber;
        string[] courses;
        bool registered;
        PhDApplication phdApplication;
    }

    // Struct to store PhD application details
    struct PhDApplication {
        string researchInterests;
        string sop;
        string researchProposal;
        string professor;
    }

    // Mappings for student and professor data
    mapping(address => Student) public students;
    mapping(address => bool) public isProfessor;

    address[] public studentAddresses;
    address[] public professorAddresses;

    // Modifier to restrict actions to professors
    modifier onlyProfessor() {
        require(isProfessor[msg.sender], "Not authorized");
        _;
    }

    // Event for student registration and course registration
    event StudentRegistered(address studentAddress, string name, string email);
    event CourseRegistered(address studentAddress, string courseName);

    // Constructor to initialize the contract (optional)
    constructor() {}

    // Function for student sign-up
    function signUp(
        string memory _name, 
        uint _age, 
        string memory _dob, 
        string memory _location, 
        string memory _aadharCard, 
        uint _abaCredits, 
        string memory _email, 
        string memory _phoneNumber
    ) public {
        require(!students[msg.sender].registered, "Student already registered");

        // Initialize the student data
        students[msg.sender] = Student
        (
            _name, 
            _age, 
            _dob, 
            _location, 
            _aadharCard, 
            _abaCredits, 
            _email, 
            _phoneNumber, 
            new string[](0),
            true, // Set registered to true
            PhDApplication("", "", "", "")
        );
        studentAddresses.push(msg.sender);

        emit StudentRegistered(msg.sender, _name, _email);
    }

    // Function to register courses
    function registerCourses(string[] memory _selectedCourses) public {
        require(students[msg.sender].registered, "Student not registered");
        require(_selectedCourses.length > 0, "Please select at least one course");

        // Add courses to student's list (Assuming courses are valid)
        for (uint i = 0; i < _selectedCourses.length; i++) {
            students[msg.sender].courses.push(_selectedCourses[i]);
            emit CourseRegistered(msg.sender, _selectedCourses[i]);
        }
    }

    // Function to register for PhD (simplified to avoid large stack)
    function registerForPhD(
        string memory _researchInterests, 
        string memory _sop, 
        string memory _researchProposal, 
        string memory _professor
    ) public {
        require(students[msg.sender].registered, "Student not registered");

        // Store the PhD application data
        students[msg.sender].phdApplication = PhDApplication(
            _researchInterests,
            _sop,
            _researchProposal,
            _professor
        );
        emit StudentRegistered(msg.sender, students[msg.sender].name, students[msg.sender].email);
    }

    // Function to get student data
    function getStudentData(address _student) public view returns (Student memory) {
        return students[_student];
    }

    // Function to get all courses of a student
    function getStudentCourses(address _student) public view returns (string[] memory) {
        return students[_student].courses;
    }

    // Function to add a professor (only by authorized users)
    function addProfessor(address _professor) public onlyProfessor {
        require(!isProfessor[_professor], "Professor already added");
        isProfessor[_professor] = true;
        professorAddresses.push(_professor);
    }
}
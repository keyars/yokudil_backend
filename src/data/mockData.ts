export const dashboardStats = {
  totalMembers: 145,
  activeClasses: 12,
  teachingHours: 280,
  attendanceRate: 85.5,
  recentActivities: [
    { type: "member_joined", message: "New member Sarah joined Arumbu Ani", time: "2 hours ago" },
    { type: "class_completed", message: "Morning Yoga class completed", time: "3 hours ago" },
    { type: "attendance_marked", message: "Attendance marked for Evening Flow", time: "4 hours ago" },
    { type: "event_created", message: "International Yoga Day event created", time: "1 day ago" }
  ],
  upcomingClasses: [
    { name: "Morning Yoga", time: "09:00 AM", instructor: "Teacher A", level: "Arumbu Ani" },
    { name: "Evening Flow", time: "06:00 PM", instructor: "Teacher B", level: "Mottu Ani" },
    { name: "Advanced Practice", time: "07:30 PM", instructor: "Teacher A", level: "Mugai Ani" }
  ]
};

export const membershipLevels = [
  "Arumbu Ani",
  "Mottu Ani", 
  "Mugai Ani",
  "Malar Ani"
];

export const mockMembers = [
  {
    id: "M0001",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+65-91234567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    address: "123 Main St, Singapore",
    emergencyContact: {
      name: "John Johnson",
      phone: "+65-98765432",
      relationship: "Spouse"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-01-15",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "165cm",
      weight: "55kg",
      waist: "28in",
      hip: "35in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-15",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Regular practitioner"
    },
    attendanceRate: 85.5,
    totalClasses: 45,
    lastActive: "2025-09-18"
  },
  {
    id: "M0002",
    name: "Michael Chen",
    email: "michael@email.com",
    phone: "+65-91234568",
    dateOfBirth: "1985-03-22",
    gender: "Male",
    address: "456 Oak Ave, Singapore",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "+65-98765433",
      relationship: "Wife"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-02-10",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "175cm",
      weight: "70kg",
      waist: "32in",
      hip: "38in",
      armSize: "14in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Lower back pain"],
      lastCheckup: "2025-08-10",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Recovering from injury"
    },
    attendanceRate: 78.2,
    totalClasses: 32,
    lastActive: "2025-09-17"
  },
  {
    id: "M0003",
    name: "Emily Rodriguez",
    email: "emily@email.com",
    phone: "+65-91234569",
    dateOfBirth: "1992-08-10",
    gender: "Female",
    address: "789 Pine St, Singapore",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+65-98765434",
      relationship: "Brother"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-11-20",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "160cm",
      weight: "52kg",
      waist: "26in",
      hip: "34in",
      armSize: "11in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-15",
      vitaminD: "Normal",
      ferritin: "High",
      remarks: "Advanced practitioner"
    },
    attendanceRate: 92.1,
    totalClasses: 67,
    lastActive: "2025-09-18"
  },
  // Adding 27 more members to reach 30 total
  {
    id: "M0004",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+65-91234570",
    dateOfBirth: "1988-12-03",
    gender: "Male",
    address: "321 Elm St, Singapore",
    emergencyContact: {
      name: "Jenny Kim",
      phone: "+65-98765435",
      relationship: "Wife"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-03-05",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "178cm",
      weight: "75kg",
      waist: "34in",
      hip: "40in",
      armSize: "15in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-20",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Consistent practitioner"
    },
    attendanceRate: 88.7,
    totalClasses: 28,
    lastActive: "2025-09-19"
  },
  {
    id: "M0005",
    name: "Jessica Wong",
    email: "jessica.wong@email.com",
    phone: "+65-91234571",
    dateOfBirth: "1995-07-18",
    gender: "Female",
    address: "654 Maple Ave, Singapore",
    emergencyContact: {
      name: "Peter Wong",
      phone: "+65-98765436",
      relationship: "Father"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-01-20",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "162cm",
      weight: "58kg",
      waist: "29in",
      hip: "36in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Mild anxiety"],
      lastCheckup: "2025-07-25",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Benefits from yoga for stress relief"
    },
    attendanceRate: 91.2,
    totalClasses: 38,
    lastActive: "2025-09-18"
  },
  {
    id: "M0006",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+65-91234572",
    dateOfBirth: "1982-04-25",
    gender: "Male",
    address: "987 Oak Lane, Singapore",
    emergencyContact: {
      name: "Mary Taylor",
      phone: "+65-98765437",
      relationship: "Wife"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-10-15",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "180cm",
      weight: "82kg",
      waist: "36in",
      hip: "42in",
      armSize: "16in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["High blood pressure"],
      lastCheckup: "2025-08-05",
      vitaminD: "Normal",
      ferritin: "High",
      remarks: "Yoga helps with blood pressure management"
    },
    attendanceRate: 76.8,
    totalClasses: 52,
    lastActive: "2025-09-17"
  },
  {
    id: "M0007",
    name: "Amanda Lee",
    email: "amanda.lee@email.com",
    phone: "+65-91234573",
    dateOfBirth: "1993-11-12",
    gender: "Female",
    address: "147 Pine Road, Singapore",
    emergencyContact: {
      name: "Steven Lee",
      phone: "+65-98765438",
      relationship: "Brother"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-02-28",
    status: "Inactive",
    invitationStatus: "approved",
    healthMetrics: {
      height: "168cm",
      weight: "62kg",
      waist: "30in",
      hip: "37in",
      armSize: "13in",
      lastUpdated: "2025-08-15"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-06-10",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Taking a break due to work commitments"
    },
    attendanceRate: 45.2,
    totalClasses: 15,
    lastActive: "2025-08-20"
  },
  {
    id: "M0008",
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+65-91234574",
    dateOfBirth: "1987-09-08",
    gender: "Male",
    address: "258 Cedar St, Singapore",
    emergencyContact: {
      name: "Sarah Wilson",
      phone: "+65-98765439",
      relationship: "Wife"
    },
    membershipLevel: "Malar Ani",
    joinDate: "2024-08-10",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "176cm",
      weight: "78kg",
      waist: "35in",
      hip: "41in",
      armSize: "15in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-30",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Advanced practitioner, excellent form"
    },
    attendanceRate: 94.5,
    totalClasses: 89,
    lastActive: "2025-09-19"
  },
  {
    id: "M0009",
    name: "Lisa Martinez",
    email: "lisa.martinez@email.com",
    phone: "+65-91234575",
    dateOfBirth: "1991-06-14",
    gender: "Female",
    address: "369 Birch Ave, Singapore",
    emergencyContact: {
      name: "Carlos Martinez",
      phone: "+65-98765440",
      relationship: "Husband"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-01-08",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "164cm",
      weight: "56kg",
      waist: "28in",
      hip: "35in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Mild scoliosis"],
      lastCheckup: "2025-08-12",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Yoga helps with posture correction"
    },
    attendanceRate: 87.3,
    totalClasses: 41,
    lastActive: "2025-09-18"
  },
  {
    id: "M0010",
    name: "Kevin Brown",
    email: "kevin.brown@email.com",
    phone: "+65-91234576",
    dateOfBirth: "1984-03-30",
    gender: "Male",
    address: "741 Willow St, Singapore",
    emergencyContact: {
      name: "Michelle Brown",
      phone: "+65-98765441",
      relationship: "Wife"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-04-12",
    status: "Pending",
    invitationStatus: "pending",
    healthMetrics: {
      height: "174cm",
      weight: "71kg",
      waist: "33in",
      hip: "39in",
      armSize: "14in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-18",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "New member, awaiting approval"
    },
    attendanceRate: 0,
    totalClasses: 0,
    lastActive: "2025-09-19"
  },
  // Continue adding more members...
  {
    id: "M0011",
    name: "Rachel Green",
    email: "rachel.green@email.com",
    phone: "+65-91234577",
    dateOfBirth: "1989-12-22",
    gender: "Female",
    address: "852 Spruce Lane, Singapore",
    emergencyContact: {
      name: "Monica Green",
      phone: "+65-98765442",
      relationship: "Sister"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-12-05",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "166cm",
      weight: "59kg",
      waist: "29in",
      hip: "36in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-20",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Excellent flexibility and strength"
    },
    attendanceRate: 89.4,
    totalClasses: 56,
    lastActive: "2025-09-18"
  },
  {
    id: "M0012",
    name: "Thomas Anderson",
    email: "thomas.anderson@email.com",
    phone: "+65-91234578",
    dateOfBirth: "1986-08-17",
    gender: "Male",
    address: "963 Poplar St, Singapore",
    emergencyContact: {
      name: "Trinity Anderson",
      phone: "+65-98765443",
      relationship: "Wife"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-03-18",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "179cm",
      weight: "76kg",
      waist: "34in",
      hip: "40in",
      armSize: "15in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Chronic stress"],
      lastCheckup: "2025-08-08",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Uses yoga for stress management"
    },
    attendanceRate: 82.6,
    totalClasses: 31,
    lastActive: "2025-09-17"
  },
  {
    id: "M0013",
    name: "Sophie Turner",
    email: "sophie.turner@email.com",
    phone: "+65-91234579",
    dateOfBirth: "1994-02-21",
    gender: "Female",
    address: "159 Ash Road, Singapore",
    emergencyContact: {
      name: "Joe Turner",
      phone: "+65-98765444",
      relationship: "Husband"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-05-03",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "163cm",
      weight: "54kg",
      waist: "27in",
      hip: "34in",
      armSize: "11in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-25",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Enthusiastic beginner"
    },
    attendanceRate: 93.8,
    totalClasses: 22,
    lastActive: "2025-09-19"
  },
  {
    id: "M0014",
    name: "Daniel Garcia",
    email: "daniel.garcia@email.com",
    phone: "+65-91234580",
    dateOfBirth: "1983-10-09",
    gender: "Male",
    address: "357 Hickory Ave, Singapore",
    emergencyContact: {
      name: "Maria Garcia",
      phone: "+65-98765445",
      relationship: "Wife"
    },
    membershipLevel: "Malar Ani",
    joinDate: "2024-07-22",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "177cm",
      weight: "80kg",
      waist: "35in",
      hip: "41in",
      armSize: "16in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-15",
      vitaminD: "Normal",
      ferritin: "High",
      remarks: "Master level practitioner"
    },
    attendanceRate: 96.2,
    totalClasses: 98,
    lastActive: "2025-09-19"
  },
  {
    id: "M0015",
    name: "Olivia Davis",
    email: "olivia.davis@email.com",
    phone: "+65-91234581",
    dateOfBirth: "1992-05-16",
    gender: "Female",
    address: "468 Sycamore St, Singapore",
    emergencyContact: {
      name: "Emma Davis",
      phone: "+65-98765446",
      relationship: "Sister"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-02-14",
    status: "Inactive",
    invitationStatus: "approved",
    healthMetrics: {
      height: "167cm",
      weight: "61kg",
      waist: "30in",
      hip: "37in",
      armSize: "13in",
      lastUpdated: "2025-08-01"
    },
    medicalInfo: {
      conditions: ["Pregnancy"],
      lastCheckup: "2025-08-30",
      vitaminD: "Normal",
      ferritin: "Low",
      remarks: "On maternity leave"
    },
    attendanceRate: 72.1,
    totalClasses: 25,
    lastActive: "2025-08-15"
  },
  {
    id: "M0016",
    name: "Christopher Lee",
    email: "christopher.lee@email.com",
    phone: "+65-91234582",
    dateOfBirth: "1988-01-11",
    gender: "Male",
    address: "579 Magnolia Lane, Singapore",
    emergencyContact: {
      name: "Jennifer Lee",
      phone: "+65-98765447",
      relationship: "Wife"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-11-08",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "181cm",
      weight: "83kg",
      waist: "36in",
      hip: "42in",
      armSize: "16in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Lower back pain"],
      lastCheckup: "2025-08-22",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Improving with regular practice"
    },
    attendanceRate: 85.7,
    totalClasses: 48,
    lastActive: "2025-09-18"
  },
  {
    id: "M0017",
    name: "Isabella White",
    email: "isabella.white@email.com",
    phone: "+65-91234583",
    dateOfBirth: "1990-09-27",
    gender: "Female",
    address: "680 Dogwood St, Singapore",
    emergencyContact: {
      name: "Alexander White",
      phone: "+65-98765448",
      relationship: "Husband"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-03-25",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "165cm",
      weight: "57kg",
      waist: "28in",
      hip: "35in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-14",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Consistent attendance and improvement"
    },
    attendanceRate: 90.3,
    totalClasses: 29,
    lastActive: "2025-09-19"
  },
  {
    id: "M0018",
    name: "Matthew Johnson",
    email: "matthew.johnson@email.com",
    phone: "+65-91234584",
    dateOfBirth: "1985-07-04",
    gender: "Male",
    address: "791 Redwood Ave, Singapore",
    emergencyContact: {
      name: "Ashley Johnson",
      phone: "+65-98765449",
      relationship: "Wife"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-01-30",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "175cm",
      weight: "73kg",
      waist: "33in",
      hip: "39in",
      armSize: "14in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Mild arthritis"],
      lastCheckup: "2025-08-06",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Yoga helps with joint mobility"
    },
    attendanceRate: 79.4,
    totalClasses: 35,
    lastActive: "2025-09-17"
  },
  {
    id: "M0019",
    name: "Grace Thompson",
    email: "grace.thompson@email.com",
    phone: "+65-91234585",
    dateOfBirth: "1993-04-13",
    gender: "Female",
    address: "802 Chestnut Road, Singapore",
    emergencyContact: {
      name: "William Thompson",
      phone: "+65-98765450",
      relationship: "Father"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-04-20",
    status: "Pending",
    invitationStatus: "pending",
    healthMetrics: {
      height: "161cm",
      weight: "53kg",
      waist: "26in",
      hip: "33in",
      armSize: "11in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-28",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Awaiting membership approval"
    },
    attendanceRate: 0,
    totalClasses: 0,
    lastActive: "2025-09-19"
  },
  {
    id: "M0020",
    name: "Andrew Miller",
    email: "andrew.miller@email.com",
    phone: "+65-91234586",
    dateOfBirth: "1987-11-29",
    gender: "Male",
    address: "913 Walnut St, Singapore",
    emergencyContact: {
      name: "Rebecca Miller",
      phone: "+65-98765451",
      relationship: "Wife"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-09-12",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "178cm",
      weight: "77kg",
      waist: "34in",
      hip: "40in",
      armSize: "15in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-18",
      vitaminD: "Normal",
      ferritin: "High",
      remarks: "Strong and dedicated practitioner"
    },
    attendanceRate: 88.9,
    totalClasses: 64,
    lastActive: "2025-09-18"
  },
  {
    id: "M0021",
    name: "Natalie Wilson",
    email: "natalie.wilson@email.com",
    phone: "+65-91234587",
    dateOfBirth: "1991-08-06",
    gender: "Female",
    address: "124 Beech Lane, Singapore",
    emergencyContact: {
      name: "Ryan Wilson",
      phone: "+65-98765452",
      relationship: "Brother"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-02-08",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "169cm",
      weight: "63kg",
      waist: "31in",
      hip: "38in",
      armSize: "13in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-16",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Excellent progress in intermediate poses"
    },
    attendanceRate: 86.5,
    totalClasses: 37,
    lastActive: "2025-09-19"
  },
  {
    id: "M0022",
    name: "Benjamin Clark",
    email: "benjamin.clark@email.com",
    phone: "+65-91234588",
    dateOfBirth: "1984-12-15",
    gender: "Male",
    address: "235 Cypress Ave, Singapore",
    emergencyContact: {
      name: "Hannah Clark",
      phone: "+65-98765453",
      relationship: "Wife"
    },
    membershipLevel: "Malar Ani",
    joinDate: "2024-06-18",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "182cm",
      weight: "85kg",
      waist: "37in",
      hip: "43in",
      armSize: "17in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-28",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Advanced practitioner with excellent technique"
    },
    attendanceRate: 95.8,
    totalClasses: 112,
    lastActive: "2025-09-19"
  },
  {
    id: "M0023",
    name: "Victoria Adams",
    email: "victoria.adams@email.com",
    phone: "+65-91234589",
    dateOfBirth: "1989-03-23",
    gender: "Female",
    address: "346 Fir St, Singapore",
    emergencyContact: {
      name: "David Adams",
      phone: "+65-98765454",
      relationship: "Husband"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-05-15",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "164cm",
      weight: "55kg",
      waist: "27in",
      hip: "34in",
      armSize: "11in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-21",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "New member with great potential"
    },
    attendanceRate: 92.7,
    totalClasses: 18,
    lastActive: "2025-09-18"
  },
  {
    id: "M0024",
    name: "Nicholas Moore",
    email: "nicholas.moore@email.com",
    phone: "+65-91234590",
    dateOfBirth: "1986-06-10",
    gender: "Male",
    address: "457 Cedar Lane, Singapore",
    emergencyContact: {
      name: "Samantha Moore",
      phone: "+65-98765455",
      relationship: "Wife"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-10-03",
    status: "Inactive",
    invitationStatus: "approved",
    healthMetrics: {
      height: "176cm",
      weight: "74kg",
      waist: "33in",
      hip: "39in",
      armSize: "14in",
      lastUpdated: "2025-08-10"
    },
    medicalInfo: {
      conditions: ["Work injury"],
      lastCheckup: "2025-08-01",
      vitaminD: "Low",
      ferritin: "Normal",
      remarks: "Temporarily inactive due to injury"
    },
    attendanceRate: 68.3,
    totalClasses: 41,
    lastActive: "2025-08-10"
  },
  {
    id: "M0025",
    name: "Stephanie Hall",
    email: "stephanie.hall@email.com",
    phone: "+65-91234591",
    dateOfBirth: "1992-01-28",
    gender: "Female",
    address: "568 Elm Road, Singapore",
    emergencyContact: {
      name: "Michael Hall",
      phone: "+65-98765456",
      relationship: "Husband"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-03-12",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "166cm",
      weight: "60kg",
      waist: "29in",
      hip: "36in",
      armSize: "12in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-19",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Consistent and improving steadily"
    },
    attendanceRate: 84.2,
    totalClasses: 32,
    lastActive: "2025-09-17"
  },
  {
    id: "M0026",
    name: "Jonathan Wright",
    email: "jonathan.wright@email.com",
    phone: "+65-91234592",
    dateOfBirth: "1983-09-19",
    gender: "Male",
    address: "679 Pine Lane, Singapore",
    emergencyContact: {
      name: "Laura Wright",
      phone: "+65-98765457",
      relationship: "Wife"
    },
    membershipLevel: "Malar Ani",
    joinDate: "2024-05-25",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "180cm",
      weight: "81kg",
      waist: "35in",
      hip: "41in",
      armSize: "16in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-07-22",
      vitaminD: "Normal",
      ferritin: "High",
      remarks: "Master level with teaching potential"
    },
    attendanceRate: 97.1,
    totalClasses: 125,
    lastActive: "2025-09-19"
  },
  {
    id: "M0027",
    name: "Megan Lopez",
    email: "megan.lopez@email.com",
    phone: "+65-91234593",
    dateOfBirth: "1994-11-07",
    gender: "Female",
    address: "780 Maple Road, Singapore",
    emergencyContact: {
      name: "Carlos Lopez",
      phone: "+65-98765458",
      relationship: "Father"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-06-02",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "162cm",
      weight: "52kg",
      waist: "26in",
      hip: "33in",
      armSize: "11in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-26",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Enthusiastic beginner with natural ability"
    },
    attendanceRate: 95.4,
    totalClasses: 16,
    lastActive: "2025-09-19"
  },
  {
    id: "M0028",
    name: "Ryan Scott",
    email: "ryan.scott@email.com",
    phone: "+65-91234594",
    dateOfBirth: "1988-04-02",
    gender: "Male",
    address: "891 Oak Road, Singapore",
    emergencyContact: {
      name: "Kelly Scott",
      phone: "+65-98765459",
      relationship: "Wife"
    },
    membershipLevel: "Mottu Ani",
    joinDate: "2025-01-25",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "177cm",
      weight: "75kg",
      waist: "34in",
      hip: "40in",
      armSize: "15in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["Shoulder injury (recovered)"],
      lastCheckup: "2025-08-11",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Fully recovered and practicing regularly"
    },
    attendanceRate: 81.7,
    totalClasses: 36,
    lastActive: "2025-09-18"
  },
  {
    id: "M0029",
    name: "Lauren King",
    email: "lauren.king@email.com",
    phone: "+65-91234595",
    dateOfBirth: "1990-12-18",
    gender: "Female",
    address: "102 Birch St, Singapore",
    emergencyContact: {
      name: "Jason King",
      phone: "+65-98765460",
      relationship: "Husband"
    },
    membershipLevel: "Mugai Ani",
    joinDate: "2024-08-30",
    status: "Active",
    invitationStatus: "approved",
    healthMetrics: {
      height: "168cm",
      weight: "64kg",
      waist: "30in",
      hip: "37in",
      armSize: "13in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-04",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "Advanced practitioner with excellent form"
    },
    attendanceRate: 90.8,
    totalClasses: 71,
    lastActive: "2025-09-19"
  },
  {
    id: "M0030",
    name: "Tyler Green",
    email: "tyler.green@email.com",
    phone: "+65-91234596",
    dateOfBirth: "1985-05-31",
    gender: "Male",
    address: "213 Spruce Ave, Singapore",
    emergencyContact: {
      name: "Amanda Green",
      phone: "+65-98765461",
      relationship: "Wife"
    },
    membershipLevel: "Arumbu Ani",
    joinDate: "2025-04-08",
    status: "Pending",
    invitationStatus: "pending",
    healthMetrics: {
      height: "174cm",
      weight: "72kg",
      waist: "32in",
      hip: "38in",
      armSize: "14in",
      lastUpdated: "2025-09-01"
    },
    medicalInfo: {
      conditions: ["None"],
      lastCheckup: "2025-08-29",
      vitaminD: "Normal",
      ferritin: "Normal",
      remarks: "New registration awaiting approval"
    },
    attendanceRate: 0,
    totalClasses: 0,
    lastActive: "2025-09-19"
  }
];

// Enhanced attendance data with more records
export const mockClasses = [
  {
    id: "C001",
    title: "Morning Yoga Flow",
    instructor: "Teacher A",
    date: "2025-09-18",
    time: "09:00",
    duration: 90,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567890",
    capacity: 20,
    enrolled: 15,
    level: ["Arumbu Ani", "Mottu Ani"],
    frequency: "Weekly",
    status: "Completed",
    description: "Gentle morning flow suitable for beginners",
    recurring: {
      type: "weekly",
      days: ["Monday"],
      endDate: "2025-12-20"
    }
  },
  {
    id: "C002",
    title: "Evening Flow",
    instructor: "Teacher B",
    date: "2025-09-18",
    time: "18:00",
    duration: 75,
    type: "In-Person",
    zoomLink: "",
    capacity: 15,
    enrolled: 12,
    level: ["Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Completed",
    description: "Dynamic evening practice for intermediate students",
    recurring: {
      type: "weekly",
      days: ["Tuesday", "Thursday"],
      endDate: "2025-12-21"
    }
  },
  {
    id: "C003",
    title: "Advanced Practice",
    instructor: "Teacher A",
    date: "2025-09-19",
    time: "19:30",
    duration: 105,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567891",
    capacity: 10,
    enrolled: 8,
    level: ["Mugai Ani", "Malar Ani"],
    frequency: "Bi-weekly",
    status: "Completed",
    description: "Challenging practice for advanced practitioners",
    recurring: {
      type: "custom",
      days: ["Wednesday", "Saturday"],
      endDate: "2025-12-22"
    }
  },
  {
    id: "C004",
    title: "Beginner's Workshop",
    instructor: "Priya Sharma",
    date: "2025-09-19",
    time: "10:00",
    duration: 120,
    type: "In-Person",
    zoomLink: "",
    capacity: 25,
    enrolled: 18,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Completed",
    description: "Introduction to yoga fundamentals and basic poses",
    recurring: {
      type: "weekly",
      days: ["Friday"],
      endDate: "2025-11-23"
    }
  },
  {
    id: "C005",
    title: "Meditation & Mindfulness",
    instructor: "Michael Chen",
    date: "2025-09-20",
    time: "07:00",
    duration: 45,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567892",
    capacity: 30,
    enrolled: 22,
    level: ["Arumbu Ani", "Mottu Ani", "Mugai Ani"],
    frequency: "Daily",
    status: "Scheduled",
    description: "Daily meditation practice for all levels",
    recurring: {
      type: "daily",
      days: [],
      endDate: "2025-12-31"
    }
  },
  {
    id: "C006",
    title: "Power Yoga",
    instructor: "David Kumar",
    date: "2025-09-20",
    time: "17:30",
    duration: 90,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567893",
    capacity: 20,
    enrolled: 16,
    level: ["Mottu Ani", "Mugai Ani", "Malar Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "High-intensity yoga for strength and endurance",
    recurring: {
      type: "weekly",
      days: ["Monday", "Wednesday", "Friday"],
      endDate: "2025-12-25"
    }
  },
  // Today's Classes (September 20, 2025)
  {
    id: "C007",
    title: "Sunrise Yoga",
    instructor: "Priya Sharma",
    date: "2025-09-20",
    time: "06:30",
    duration: 60,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567894",
    capacity: 25,
    enrolled: 18,
    level: ["Arumbu Ani", "Mottu Ani"],
    frequency: "Daily",
    status: "Scheduled",
    description: "Start your day with energizing sunrise practice",
    recurring: {
      type: "daily",
      days: [],
      endDate: "2025-12-20"
    }
  },
  {
    id: "C008",
    title: "Lunch Break Stretch",
    instructor: "Michael Chen",
    date: "2025-09-20",
    time: "12:30",
    duration: 30,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567895",
    capacity: 15,
    enrolled: 12,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Quick midday stretch for office workers",
    recurring: {
      type: "weekly",
      days: ["Monday", "Wednesday", "Friday"],
      endDate: "2025-12-20"
    }
  },
  // Tomorrow's Classes (September 21, 2025)
  {
    id: "C009",
    title: "Morning Vinyasa",
    instructor: "David Kumar",
    date: "2025-09-21",
    time: "08:00",
    duration: 75,
    type: "In-Person",
    zoomLink: "",
    capacity: 20,
    enrolled: 14,
    level: ["Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Dynamic morning flow to energize your day",
    recurring: {
      type: "weekly",
      days: ["Tuesday", "Thursday"],
      endDate: "2025-12-21"
    }
  },
  {
    id: "C010",
    title: "Restorative Yoga",
    instructor: "Priya Sharma",
    date: "2025-09-21",
    time: "19:00",
    duration: 90,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567896",
    capacity: 18,
    enrolled: 15,
    level: ["Arumbu Ani", "Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Relaxing evening practice for deep restoration",
    recurring: {
      type: "weekly",
      days: ["Tuesday"],
      endDate: "2025-12-21"
    }
  },
  // Day After Tomorrow (September 22, 2025)
  {
    id: "C011",
    title: "Hatha Yoga Basics",
    instructor: "Michael Chen",
    date: "2025-09-22",
    time: "09:30",
    duration: 90,
    type: "In-Person",
    zoomLink: "",
    capacity: 15,
    enrolled: 11,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Traditional Hatha practice focusing on alignment",
    recurring: {
      type: "weekly",
      days: ["Wednesday"],
      endDate: "2025-12-22"
    }
  },
  {
    id: "C012",
    title: "Core Strength Yoga",
    instructor: "David Kumar",
    date: "2025-09-22",
    time: "18:30",
    duration: 60,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567897",
    capacity: 25,
    enrolled: 20,
    level: ["Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Build core strength with targeted yoga poses",
    recurring: {
      type: "weekly",
      days: ["Wednesday", "Friday"],
      endDate: "2025-12-22"
    }
  },
  // Future Classes (September 23, 2025)
  {
    id: "C013",
    title: "Prenatal Yoga",
    instructor: "Priya Sharma",
    date: "2025-09-23",
    time: "10:30",
    duration: 75,
    type: "In-Person",
    zoomLink: "",
    capacity: 12,
    enrolled: 8,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Safe and gentle yoga practice for expecting mothers",
    recurring: {
      type: "weekly",
      days: ["Thursday"],
      endDate: "2025-12-23"
    }
  },
  {
    id: "C014",
    title: "Yin Yoga",
    instructor: "Michael Chen",
    date: "2025-09-23",
    time: "20:00",
    duration: 90,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567898",
    capacity: 20,
    enrolled: 16,
    level: ["Arumbu Ani", "Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Deep, meditative practice with long-held poses",
    recurring: {
      type: "weekly",
      days: ["Thursday"],
      endDate: "2025-12-23"
    }
  },
  // Weekend Classes (September 24, 2025)
  {
    id: "C015",
    title: "Weekend Warrior Flow",
    instructor: "David Kumar",
    date: "2025-09-24",
    time: "09:00",
    duration: 105,
    type: "In-Person",
    zoomLink: "",
    capacity: 22,
    enrolled: 19,
    level: ["Mottu Ani", "Mugai Ani", "Malar Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Intensive weekend practice for dedicated practitioners",
    recurring: {
      type: "weekly",
      days: ["Friday"],
      endDate: "2025-12-24"
    }
  },
  // Weekend Classes (September 25, 2025)
  {
    id: "C016",
    title: "Family Yoga",
    instructor: "Priya Sharma",
    date: "2025-09-25",
    time: "10:00",
    duration: 60,
    type: "In-Person",
    zoomLink: "",
    capacity: 30,
    enrolled: 24,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Fun yoga practice for families with children",
    recurring: {
      type: "weekly",
      days: ["Saturday"],
      endDate: "2025-12-25"
    }
  },
  {
    id: "C017",
    title: "Saturday Power Flow",
    instructor: "David Kumar",
    date: "2025-09-25",
    time: "16:00",
    duration: 90,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567899",
    capacity: 25,
    enrolled: 21,
    level: ["Mugai Ani", "Malar Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "High-energy weekend flow for advanced students",
    recurring: {
      type: "weekly",
      days: ["Saturday"],
      endDate: "2025-12-25"
    }
  },
  // Sunday Classes (September 26, 2025)
  {
    id: "C018",
    title: "Sunday Slow Flow",
    instructor: "Michael Chen",
    date: "2025-09-26",
    time: "11:00",
    duration: 75,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567900",
    capacity: 20,
    enrolled: 17,
    level: ["Arumbu Ani", "Mottu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Gentle Sunday practice to prepare for the week",
    recurring: {
      type: "weekly",
      days: ["Sunday"],
      endDate: "2025-12-26"
    }
  },
  {
    id: "C019",
    title: "Sunday Evening Meditation",
    instructor: "Priya Sharma",
    date: "2025-09-26",
    time: "18:00",
    duration: 45,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567901",
    capacity: 35,
    enrolled: 28,
    level: ["Arumbu Ani", "Mottu Ani", "Mugai Ani", "Malar Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Weekly meditation session to end the weekend peacefully",
    recurring: {
      type: "weekly",
      days: ["Sunday"],
      endDate: "2025-12-26"
    }
  },
  // October 2025 Classes
  {
    id: "C020",
    title: "October Morning Flow",
    instructor: "Priya Sharma",
    date: "2025-10-01",
    time: "08:00",
    duration: 75,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567902",
    capacity: 20,
    enrolled: 16,
    level: ["Arumbu Ani", "Mottu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Fresh start to October with energizing flow",
    recurring: {
      type: "weekly",
      days: ["Wednesday"],
      endDate: "2025-12-31"
    }
  },
  {
    id: "C021",
    title: "Autumn Strength Yoga",
    instructor: "David Kumar",
    date: "2025-10-03",
    time: "18:00",
    duration: 90,
    type: "In-Person",
    zoomLink: "",
    capacity: 18,
    enrolled: 14,
    level: ["Mottu Ani", "Mugai Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Build strength as we transition into autumn",
    recurring: {
      type: "weekly",
      days: ["Friday"],
      endDate: "2025-12-31"
    }
  },
  {
    id: "C022",
    title: "Weekend Wellness Workshop",
    instructor: "Michael Chen",
    date: "2025-10-05",
    time: "10:00",
    duration: 120,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567903",
    capacity: 25,
    enrolled: 20,
    level: ["Arumbu Ani", "Mottu Ani", "Mugai Ani"],
    frequency: "Monthly",
    status: "Scheduled",
    description: "Monthly wellness workshop covering yoga and mindfulness",
    recurring: {
      type: "custom",
      days: ["Saturday"],
      endDate: "2025-12-31"
    }
  },
  {
    id: "C023",
    title: "Mid-October Flow",
    instructor: "Priya Sharma",
    date: "2025-10-15",
    time: "09:30",
    duration: 60,
    type: "Online",
    zoomLink: "https://zoom.us/j/1234567904",
    capacity: 22,
    enrolled: 18,
    level: ["Arumbu Ani"],
    frequency: "Weekly",
    status: "Scheduled",
    description: "Gentle mid-month practice for beginners",
    recurring: {
      type: "weekly",
      days: ["Tuesday"],
      endDate: "2025-12-31"
    }
  },
  {
    id: "C024",
    title: "Halloween Special Class",
    instructor: "David Kumar",
    date: "2025-10-31",
    time: "19:00",
    duration: 75,
    type: "Hybrid",
    zoomLink: "https://zoom.us/j/1234567905",
    capacity: 30,
    enrolled: 25,
    level: ["Mottu Ani", "Mugai Ani", "Malar Ani"],
    frequency: "One-time",
    status: "Scheduled",
    description: "Special Halloween-themed yoga session with fun poses",
    recurring: {
      type: "custom",
      days: [],
      endDate: "2025-10-31"
    }
  }
];

export const instructors = [
  { 
    id: 1, 
    name: "Priya Sharma", 
    role: "teacher", 
    email: "priya.sharma@yokudil.com",
    phone: "+65-91234567",
    specialization: "Hatha Yoga", 
    experience: "5 years",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    address: "123 Yoga Street, Singapore",
    joinDate: "2023-01-15",
    status: "Active",
    bio: "Experienced yoga instructor specializing in traditional Hatha practices with focus on alignment and breathing techniques.",
    emergencyContact: {
      name: "Raj Sharma",
      phone: "+65-98765432",
      relationship: "Spouse"
    }
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    role: "teacher", 
    email: "michael.chen@yokudil.com",
    phone: "+65-91234568",
    specialization: "Vinyasa Flow", 
    experience: "3 years",
    dateOfBirth: "1990-07-22",
    gender: "Male",
    address: "456 Flow Avenue, Singapore",
    joinDate: "2024-03-10",
    status: "Active",
    bio: "Dynamic instructor focused on creative sequencing and mindful movement in Vinyasa practice.",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "+65-98765433",
      relationship: "Sister"
    }
  },
  { 
    id: 3, 
    name: "Sarah Williams", 
    role: "volunteer", 
    email: "sarah.williams@yokudil.com",
    phone: "+65-91234569",
    specialization: "Meditation", 
    experience: "2 years",
    dateOfBirth: "1992-11-08",
    gender: "Female",
    address: "789 Peace Lane, Singapore",
    joinDate: "2024-06-20",
    status: "Active",
    bio: "Passionate volunteer helping with meditation sessions and community outreach programs.",
    emergencyContact: {
      name: "John Williams",
      phone: "+65-98765434",
      relationship: "Father"
    }
  },
  { 
    id: 4, 
    name: "David Kumar", 
    role: "teacher", 
    email: "david.kumar@yokudil.com",
    phone: "+65-91234570",
    specialization: "Ashtanga Yoga", 
    experience: "7 years",
    dateOfBirth: "1982-05-12",
    gender: "Male",
    address: "321 Strength Road, Singapore",
    joinDate: "2022-09-05",
    status: "Active",
    bio: "Traditional Ashtanga practitioner with deep knowledge of the primary and intermediate series.",
    emergencyContact: {
      name: "Meera Kumar",
      phone: "+65-98765435",
      relationship: "Wife"
    }
  },
  { 
    id: 5, 
    name: "Emma Thompson", 
    role: "volunteer", 
    email: "emma.thompson@yokudil.com",
    phone: "+65-91234571",
    specialization: "Yin Yoga", 
    experience: "1 year",
    dateOfBirth: "1995-09-18",
    gender: "Female",
    address: "654 Calm Street, Singapore",
    joinDate: "2024-08-15",
    status: "Active",
    bio: "New volunteer with passion for restorative practices and helping with class setup.",
    emergencyContact: {
      name: "Robert Thompson",
      phone: "+65-98765436",
      relationship: "Brother"
    }
  },
  { 
    id: 6, 
    name: "Alex Rodriguez", 
    role: "teacher", 
    email: "alex.rodriguez@yokudil.com",
    phone: "+65-91234572",
    specialization: "Power Yoga", 
    experience: "4 years",
    dateOfBirth: "1988-12-03",
    gender: "Male",
    address: "987 Energy Boulevard, Singapore",
    joinDate: "2023-11-20",
    status: "Inactive",
    bio: "High-energy instructor specializing in strength-building power yoga sequences.",
    emergencyContact: {
      name: "Maria Rodriguez",
      phone: "+65-98765437",
      relationship: "Mother"
    }
  }
];

export const mockAttendance = [
  {
    id: "A001",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-19",
    memberId: "M0001",
    memberName: "Sarah Johnson",
    checkIn: "09:05",
    checkOut: "10:30",
    duration: 85,
    type: "Online",
    feedback: "Great session, felt energized",
    rating: 5
  },
  // September 18, 2025 - Multiple levels
  {
    id: "A004",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-18",
    memberId: "M0001",
    memberName: "Sarah Johnson",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Excellent morning practice",
    rating: 5
  },
  {
    id: "A005",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-18",
    memberId: "M0004",
    memberName: "David Kim",
    checkIn: "09:02",
    checkOut: "10:30",
    duration: 88,
    type: "Online",
    feedback: "Good flow sequence",
    rating: 4
  },
  {
    id: "A006",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-18",
    memberId: "M0002",
    memberName: "Michael Chen",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Great intermediate practice",
    rating: 5
  },
  {
    id: "A007",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-18",
    memberId: "M0003",
    memberName: "Emily Rodriguez",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Challenging poses, loved it",
    rating: 5
  },
  // September 17, 2025
  {
    id: "A008",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-17",
    memberId: "M0005",
    memberName: "Jessica Wong",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Relaxing and energizing",
    rating: 4
  },
  {
    id: "A009",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-17",
    memberId: "M0006",
    memberName: "Robert Taylor",
    checkIn: "09:05",
    checkOut: "10:30",
    duration: 85,
    type: "Online",
    feedback: "Good for back pain relief",
    rating: 5
  },
  {
    id: "A010",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-17",
    memberId: "M0008",
    memberName: "James Wilson",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Excellent advanced sequences",
    rating: 5
  },
  // September 16, 2025
  {
    id: "A011",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-16",
    memberId: "M0001",
    memberName: "Sarah Johnson",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Consistent quality",
    rating: 5
  },
  {
    id: "A012",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-16",
    memberId: "M0009",
    memberName: "Lisa Martinez",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Helps with posture",
    rating: 4
  },
  {
    id: "A013",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-16",
    memberId: "M0011",
    memberName: "Rachel Green",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Perfect after work",
    rating: 5
  },
  // September 15, 2025
  {
    id: "A014",
    classId: "C004",
    className: "Beginner's Workshop",
    date: "2025-09-15",
    memberId: "M0004",
    memberName: "David Kim",
    checkIn: "10:00",
    checkOut: "12:00",
    duration: 120,
    type: "Online",
    feedback: "Great for beginners",
    rating: 5
  },
  {
    id: "A015",
    classId: "C004",
    className: "Beginner's Workshop",
    date: "2025-09-15",
    memberId: "M0013",
    memberName: "Sophie Turner",
    checkIn: "10:00",
    checkOut: "12:00",
    duration: 120,
    type: "Online",
    feedback: "Learned so much!",
    rating: 5
  },
  // September 14, 2025
  {
    id: "A016",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-14",
    memberId: "M0014",
    memberName: "Daniel Garcia",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Challenging and rewarding",
    rating: 5
  },
  {
    id: "A017",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-14",
    memberId: "M0022",
    memberName: "Benjamin Clark",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Master level practice",
    rating: 5
  },
  // September 13, 2025
  {
    id: "A018",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-13",
    memberId: "M0005",
    memberName: "Jessica Wong",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Great way to start Friday",
    rating: 4
  },
  {
    id: "A019",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-13",
    memberId: "M0017",
    memberName: "Isabella White",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Consistent improvement",
    rating: 5
  },
  // September 12, 2025
  {
    id: "A020",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-12",
    memberId: "M0012",
    memberName: "Thomas Anderson",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Stress relief after work",
    rating: 4
  },
  {
    id: "A021",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-12",
    memberId: "M0018",
    memberName: "Matthew Johnson",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Helps with joint mobility",
    rating: 4
  },
  // September 11, 2025
  {
    id: "A022",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-11",
    memberId: "M0020",
    memberName: "Andrew Miller",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Strong practice session",
    rating: 5
  },
  {
    id: "A023",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-11",
    memberId: "M0026",
    memberName: "Jonathan Wright",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Master level execution",
    rating: 5
  },
  // September 10, 2025
  {
    id: "A024",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-10",
    memberId: "M0021",
    memberName: "Natalie Wilson",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Excellent progress in poses",
    rating: 5
  },
  {
    id: "A025",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-10",
    memberId: "M0025",
    memberName: "Stephanie Hall",
    checkIn: "09:00",
    checkOut: "10:30",
    duration: 90,
    type: "Online",
    feedback: "Improving steadily",
    rating: 4
  },
  // September 9, 2025
  {
    id: "A026",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-09",
    memberId: "M0028",
    memberName: "Ryan Scott",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Fully recovered and practicing",
    rating: 4
  },
  {
    id: "A027",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-09",
    memberId: "M0029",
    memberName: "Lauren King",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "Online",
    feedback: "Advanced form, excellent",
    rating: 5
  },
  // September 8, 2025
  {
    id: "A028",
    classId: "C004",
    className: "Beginner's Workshop",
    date: "2025-09-08",
    memberId: "M0023",
    memberName: "Victoria Adams",
    checkIn: "10:00",
    checkOut: "12:00",
    duration: 120,
    type: "Online",
    feedback: "Great potential, learning fast",
    rating: 5
  },
  {
    id: "A029",
    classId: "C004",
    className: "Beginner's Workshop",
    date: "2025-09-08",
    memberId: "M0027",
    memberName: "Megan Lopez",
    checkIn: "10:00",
    checkOut: "12:00",
    duration: 120,
    type: "Online",
    feedback: "Natural ability, enthusiastic",
    rating: 5
  },
  // September 7, 2025
  {
    id: "A030",
    classId: "C003",
    className: "Advanced Practice",
    date: "2025-09-07",
    memberId: "M0016",
    memberName: "Christopher Lee",
    checkIn: "19:30",
    checkOut: "21:15",
    duration: 105,
    type: "Online",
    feedback: "Improving with regular practice",
    rating: 4
  },
  {
    id: "A002",
    classId: "C002",
    className: "Evening Flow",
    date: "2025-09-19",
    memberId: "M0002",
    memberName: "Michael Chen",
    checkIn: "18:00",
    checkOut: "19:15",
    duration: 75,
    type: "In-Person",
    feedback: "Challenging but rewarding",
    rating: 4
  },
  {
    id: "A003",
    classId: "C001",
    className: "Morning Yoga Flow",
    date: "2025-09-19",
    memberId: "M0003",
    memberName: "Emily Rodriguez",
    checkIn: "08:58",
    checkOut: "10:30",
    duration: 92,
    type: "Online",
    feedback: "Perfect start to the day",
    rating: 5
  }
];

export const mockEvents = [
  {
    id: "E001",
    title: "International Yoga Day Celebration",
    description: "Join us for a special yoga session and community gathering",
    date: "2025-06-21",
    time: "10:00",
    location: "Community Center",
    status: "Upcoming",
    attendees: 45,
    createdBy: "Admin User",
    createdDate: "2025-09-01"
  },
  {
    id: "E002",
    title: "Mindfulness Workshop",
    description: "Learn meditation and mindfulness techniques",
    date: "2025-10-15",
    time: "14:00",
    location: "Online",
    status: "Upcoming",
    attendees: 28,
    createdBy: "Teacher A",
    createdDate: "2025-09-10"
  }
];

export const mockAwards = [
  {
    id: "AW001",
    title: "Most Improved Student",
    recipient: "Sarah Johnson",
    recipientType: "Member",
    date: "2025-08-15",
    reason: "Showed exceptional progress in flexibility and strength",
    awardedBy: "Admin User"
  },
  {
    id: "AW002",
    title: "Perfect Attendance",
    recipient: "Emily Rodriguez",
    recipientType: "Member",
    date: "2025-08-30",
    reason: "100% attendance for 3 consecutive months",
    awardedBy: "Teacher B"
  }
];

export const mockLeaveRequests = [
  {
    id: "LR001",
    memberName: "Priya Sharma",
    memberId: "M001",
    memberLevel: "Arumbu Ani",
    className: "Morning Yoga Flow",
    classDate: "2025-09-25",
    classTime: "09:00 AM",
    leaveType: "Prior Leave",
    reason: 'Family wedding ceremony',
    approvedDate: null,
    comments: "Regular checkup with doctor"
  },
  {
    id: "LR002", 
    memberName: "Anita Krishnan",
    memberId: "M002",
    memberLevel: "Mottu Ani",
    className: "Evening Meditation",
    classDate: "2025-09-26",
    classTime: "07:00 PM",
    leaveType: "Emergency Leave",
    reason: "Family emergency",
    status: "Approved",
    submittedDate: "2025-09-19",
    submittedTime: "02:15 PM",
    approvedBy: "Admin User",
    approvedDate: "2025-09-19",
    comments: "Urgent family matter, approved immediately"
  },
  {
    id: "LR003",
    memberName: "Meera Nair", 
    memberId: "M003",
    memberLevel: "Mugai Ani",
    className: "Power Yoga",
    classDate: "2025-09-27",
    classTime: "06:30 PM",
    leaveType: "Prior Leave",
    reason: "Work commitment",
    status: "Approved",
    submittedDate: "2025-09-17",
    submittedTime: "09:45 AM",
    approvedBy: "Teacher A",
    approvedDate: "2025-09-18",
    comments: "Important client meeting, advance notice given"
  },
  {
    id: "LR004",
    memberName: "Lakshmi Devi",
    memberId: "M004", 
    memberLevel: "Malar Ani",
    className: "Gentle Yoga",
    classDate: "2025-09-28",
    classTime: "10:00 AM",
    leaveType: "Prior Leave",
    reason: "Travel",
    status: "Pending",
    submittedDate: "2025-09-19",
    submittedTime: "11:20 AM",
    approvedBy: null,
    approvedDate: null,
    comments: "Out of town for weekend"
  },
  {
    id: "LR005",
    memberName: "Kavitha Menon",
    memberId: "M005",
    memberLevel: "Arumbu Ani",
    className: "Sunrise Yoga",
    classDate: "2025-09-29",
    classTime: "06:00 AM",
    leaveType: "Emergency Leave",
    reason: "Illness",
    status: "Approved",
    submittedDate: "2025-09-19",
    submittedTime: "05:30 AM",
    approvedBy: "Admin User",
    approvedDate: "2025-09-19",
    comments: "Feeling unwell, rest recommended"
  },
  {
    id: "LR006",
    memberName: "Deepa Nair",
    memberId: "M006",
    memberLevel: "Mottu Ani",
    className: "Therapeutic Yoga",
    classDate: "2025-09-30",
    classTime: "04:00 PM",
    leaveType: "Prior Leave",
    reason: "Personal appointment",
    status: "Rejected",
    submittedDate: "2025-09-19",
    submittedTime: "12:00 PM",
    approvedBy: "Teacher B",
    approvedDate: "2025-09-19",
    comments: "Request submitted too late, less than 24 hours notice"
  },
  {
    id: "LR007",
    memberName: "Sita Kumari",
    memberId: "M007",
    memberLevel: "Mugai Ani",
    className: "Advanced Asanas",
    classDate: "2025-10-01",
    classTime: "07:30 PM",
    leaveType: "Prior Leave",
    reason: "Wedding function",
    status: "Approved",
    submittedDate: "2025-09-15",
    submittedTime: "03:30 PM",
    approvedBy: "Teacher A",
    approvedDate: "2025-09-16",
    comments: "Family wedding, well in advance notice"
  },
  {
    id: "LR008",
    memberName: "Radha Pillai",
    memberId: "M008",
    memberLevel: "Malar Ani",
    className: "Pranayama Session",
    classDate: "2025-10-02",
    classTime: "08:00 AM",
    leaveType: "Emergency Leave",
    reason: "Child's school program",
    status: "Pending",
    submittedDate: "2025-09-19",
    submittedTime: "04:45 PM",
    approvedBy: null,
    approvedDate: null,
    comments: "Unexpected school program, need to attend"
  },
  {
    id: "LR009",
    memberName: "Geetha Nair",
    memberId: "M009",
    memberLevel: "Arumbu Ani",
    className: "Morning Flow",
    classDate: "2025-10-03",
    classTime: "09:30 AM",
    leaveType: "Prior Leave",
    reason: "Vacation",
    status: "Approved",
    submittedDate: "2025-09-10",
    submittedTime: "01:15 PM",
    approvedBy: "Admin User",
    approvedDate: "2025-09-11",
    comments: "Pre-planned vacation, sufficient advance notice"
  },
  {
    id: "LR010",
    memberName: "Suma Devi",
    memberId: "M010",
    memberLevel: "Mottu Ani",
    className: "Restorative Yoga",
    classDate: "2025-10-04",
    classTime: "05:30 PM",
    leaveType: "Emergency Leave",
    reason: "Medical emergency",
    status: "Approved",
    submittedDate: "2025-09-19",
    submittedTime: "03:00 PM",
    approvedBy: "Admin User",
    approvedDate: "2025-09-19",
    comments: "Family medical emergency, immediate approval"
  }
];
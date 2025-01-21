const Student = require('../models/studentModel');
const University = require('../models/universityModel');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        if (students.length == 0)
            return res.status(404).json({
                message: "No students found"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({
                message: "Student not found"
            });
        return res.status(200).json({data:student});
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.updateStudent = async (req, res) => {
    try {
        console.log(req.params.id, req.body)
        const student = await Student.findOne({userID: req.params.id})
        if (!student)
            return res.status(404).json({
                message: "Student not found"
            });
        student.gender=req.body.gender;
        student.degree=req.body.degree;
        await student.save()
        return res.status(200).json(student);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student)
            return res.status(404).json({
                message: "Student not found"
            });
        return res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsByMajor = async (req, res) => {
    const major = req.params.major;
    try {
        const students = await Student.find({
            major: major
        });
        if (students.length == 0)
            return res.status(404).json({
                message: "No students found for this major"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsByUniversity = async (req, res) => {
    try {
        const universityID = req.params.UniversityID;
        const university = await University.find(universityID);
        if (!university)
            return res.status(404).json({
                message: "University not found!"
            });
        const Students = await Students.find({
            universityID: universityID
        });
        if (Students.length <= 0)
            return res.status(404).json({
                message: "No students found for this University!"
            });
        return res.status(200).json(Students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentByDegree = async (req, res) => {
    try {
        const students = await Student.find({
            degree: req.params.degree
        });
        if (students.length <= 0)
            return res.status(404).json({
                message: "No students found having degree " + req.params.degree
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsByInterests = async (req, res) => {
    try {
        const interests = req.params.interests;
        const students = await Student.find({
            interests: interests
        });
        if (students.length <= 0)
            return res.status(404).json({
                message: 'No students found having such interest'
            })
        return res.statu(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsAvailableForJob = async (req, res) => {
    try {
        const students = await Student.find({
            jobStatus: "Unemployed"
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No students available for job"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getEmployedStudents = async (req, res) => {
    try {
        const students = await Student.find({
            jobStatus: {
                $ne: "Unemployed"
            }
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No employed students found"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsWorkingPartTime = async (req, res) => {
    try {
        const students = await Student.find({
            jobStatus: "Part-time"
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No students working part-time found"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsWorkingFullTime = async (req, res) => {
    try {
        const students = await Student.find({
            jobStatus: "Full-time"
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No students working full-time found"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsSelfEmployed = async (req, res) => {
    try {
        const students = await Student.find({
            jobStatus: "Self-employed"
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No students self-employed found"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getStudentsByBootcampStatus = async (req, res) => {
    try {
        const students = await Student.find({
            bootcampStatus: req.params.bootcampStatus
        });
        if (students.length <= 0)
            return res.status(400).json({
                message: "No students found with this bootcamp status"
            });
        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getBootcampsInterestedIn = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student || !student.interests.bootcamps)
            return res.status(404).json({
                message: "No bootcamps found for this user"
            });
            const bootcamps = student.favorites.filter(fav => fav.itemType === 'Bootcamp');
        return res.status(200).json(bootcamps);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

exports.getJobsInterestedIn = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student || !student.interests.jobs)
            return res.status(404).json({
                message: "No jobs found for this user"
            });
            const jobs = student.favorites.filter(fav => fav.itemType === 'Job');
        return res.status(200).json(jobs);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getUniversitiesInterestedIn = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student || !student.interests.universities)
            return res.status(404).json({
                message: "No universities found for this user"
            });
            const universities = student.favorites.filter(fav => fav.itemType === 'University');
        return res.status(200).json(universities);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.addFavorites = async (req, res) => {
    try {
        const userid = req.params.userID;
        const { item, itemType } = req.body;
        if (!item || !itemType) {
          return res.status(400).json({ message: "Item ID and Item Type are missing!" });
        }
    
        // Find the student by their ID
        const student = await Student.findOne({userID:userid});
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
    
        // Check if the item is already in favorites
        const alreadyFavorite = student.favorites.some(
          (fav) => fav.item.toString() === item && fav.itemType === itemType
        );
    
        if (alreadyFavorite) {
          return res.status(400).json({ message: "Item is already in favorites" });
        }
    
        // Add the new favorite
        student.favorites.push({ item: item, itemType });
        await student.save();
    
        return res.status(200).json({ message: "Favorite added successfully" });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
}

exports.removeFavorite = async (req, res) => {
    try{
        const userid = req.params.userID
        const { item, itemType } = req.query;
        if (!item || !itemType) {
            return res.status(400).json({ message: "Item ID and Item Type are missing!" });
        }

        const student = await Student.findOne({userID:userid});
        if(!student)
            return res.status(400).json({message:"no student found! login again please"})
        const alreadyFavorite = student.favorites.some(
            (fav) => fav.item.toString() === item && fav.itemType === itemType
          );
        if(!alreadyFavorite)
            return res.status(409).json({message:"item is not favorite"})

        student.favorites = student.favorites.filter(fav => fav.item.toString() !== item);

        await student.save();

        return res.status(200).json({message:"item removed successfuly!"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

exports.getFavorites = async (req, res) => {
    try{
        const student = await Student.findOne({userID:req.params.id});
        if(!student)
            return res.status(404).json({message:"Something wrong happened! Please try again."})
        const favorites = student.favorites;

        return res.status(200).json({favorites:favorites});
    }catch(err){
        return res.status(401).json({
            message:err.message
        })
    }
}

exports.getStudentID = async (req, res) => {
    try{
        const userID = req.params.id;
        const student = await Student.findOne({userID:userID});
        if(!student)
            return res.status(404).json({message:"User not found!"})
        return res.status(202).json(student._id)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

exports.checkIfCompleted = async (req, res) => {
    try{
        console.log("hello")
        const id = req.params.id;
        const student = await Student.findById(id);

        if(!student)
            return res.status(404).json({message:"User not found!"})

        console.log(student)

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
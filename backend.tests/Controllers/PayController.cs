
namespace backend.tests.Controllers
{
    public class PayControllerTest : BaseTestController
    {
        [Fact]
        public void BasePayTestNoRules() //good good
        {
            PurgeDB();
            //Add shifts to db with no rules
            //set Taxrate to 0
            var userController = new UserController(_context);
            var user = MockUser();
            user.Taxrate = 0;

            var uid = userController.RegisterUser(user);

            var jobController = new JobController(_context);
            var job = MockJob(); //175kr/h
            job.UiD = uid;

            var job1id = jobController.PostJob(job);
            
            var shiftsController = new ShiftController(_context);
            var shift = MockShift();

            shift.uiD = uid;
            shift.jobbID = job1id;
            
            shiftsController.PostShift(shift);

            var payController = new PayController(_context);

            var pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(350, pay); //2 hours * 175kr/h

            userController.putUser(uid, 25, "NOK");

            pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(262.5, pay); //2 hours * 175kr/h

            var job2 = MockJob(); //175kr/h
            job2.UiD = uid;
            job2.payRate = 250;

            var jobid = jobController.PostJob(job2);

            var shift2 = MockShift();
            shift2.uiD = uid;
            shift2.jobbID = jobid;
            shiftsController.PostShift(shift2);

            pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(637.5, pay); //2 hours * 250kr/h

            var shift3 = MockShift();
            shift3.uiD = uid;
            shift3.jobbID = jobid;
            shift3.shiftDate = 20230101;
            shiftsController.PostShift(shift3);

            pay = payController.ExpectedPay(uid, 20231201, 20231230); 

            Assert.Equal(637.5, pay); //shouldnt include the new shift since out of search range
            
            // PurgeDB();
        }

        [Fact]
        public void BasePayTestWithRules()
        {
            PurgeDB();
            //Add shifts to db with no rules
            //set Taxrate to 0
            var userController = new UserController(_context);
            var user = MockUser();
            user.Taxrate = 0;

            var uid = userController.RegisterUser(user);

            var jobController = new JobController(_context);
            var job = MockJob(); //175kr/h
            job.UiD = uid;

            var job1id = jobController.PostJob(job);
            
            var shiftsController = new ShiftController(_context);
            var shift = MockShift();

            shift.uiD = uid;
            shift.jobbID = job1id;
            shift.shiftDate = 20231211;
            
            shiftsController.PostShift(shift);

            var payController = new PayController(_context);

            var Rule = MockRule();

            var ruleController = new RulesController(_context);
            ruleController.PostRule(Rule);


            var pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(700, pay); //2 hours * 175kr/h should be * 2 since rule

            var shift2 = MockShift();
            shift2.uiD = uid;
            shift2.jobbID = job1id;
            shift2.shiftDate = 20231212;
            shiftsController.PostShift(shift2);

            pay = payController.ExpectedPay(uid, 20231201, 20231230); //succsessfully ignored non "monday" rule day

            Assert.Equal(1050, pay); //2 hours * 175kr/h should be * 2 since rule


            var rule2 = MockRule();


            rule2.RuleType = "Time";
            rule2.Start = 1100; //should be one hour overlap here with both rules :)

            rule2.Rate = 100;
            rule2.RateType = "Flat"; //Flat or 100%
            rule2.JobID = job1id;

            ruleController.PostRule(rule2); //post new rule, calc pay which should be 100extra now

            pay = payController.ExpectedPay(uid, 20231201, 20231230); //succsessfully ignored non "monday" rule day

            Assert.Equal(1250, pay); //should be 1050 + 100*2 since 2 shifts with 100 flat between 11 and 12

            //works with day and time rule, have to check day and time + date

            var rule3 = MockRule();

            rule3.RuleType = "Time and Day";
            rule3.RateType = "Flat";
            rule3.Start = 1600;
            rule3.Day = "Saturday";
            rule3.Rate = 400;

            ruleController.PostRule(rule3);

            var shift3 = MockShift();
            shift3.uiD = uid;
            shift3.jobbID = job1id;
            shift3.shiftDate = 20231216;
            shift3.shiftStartTime = 1600; //3 hours of 400 extra 400 + 175 = 575 * 3
            shift3.shiftEndTime = 1900;
            shiftsController.PostShift(shift3);

            pay = payController.ExpectedPay(uid, 20231201, 20231230); //succsessfully ignored non "monday" rule day

            Assert.Equal(3275, pay); //should be 1050 + 100*2 since 2 shifts with 100 flat between 11 and 12

            var job2 = MockJob(); //175kr/h
            job2.UiD = uid;
            job2.payRate = 250;
            job2.jobName = "Test job 2";

            var jobid = jobController.PostJob(job2);

            var shift4 = MockShift();
            shift4.uiD = uid;
            shift4.jobbID = jobid;
            shift4.shiftDate = 20231216;   
            shift4.shiftStartTime = 1600; 
            shift4.shiftEndTime = 1900;
            shiftsController.PostShift(shift4);


            var rule4 = MockRule();
            rule4.RuleType = "Date";
            rule4.Date = 20231216;
            rule4.Rate = 100;
            rule4.RateType = "%";
            rule4.JobID = jobid;
            rule4.UiD = uid;

            ruleController.PostRule(rule4);

            pay = payController.ExpectedPay(uid, 20231201, 20231230); //succsessfully ignored non "monday" rule day

            Assert.Equal(4775, pay); //with new rule we should add 

            PurgeDB();

        }

    }
}
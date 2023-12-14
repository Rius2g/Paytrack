

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
            
            PurgeDB();
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

        }

    }
}
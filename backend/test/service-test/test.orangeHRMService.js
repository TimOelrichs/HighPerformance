
const sinon = require('sinon');
let { orangeHRMService } = require("../../services/orangeHRM.service");
//let { openCRXService } = require("../services/openCRX.service")
const chai = require('chai');
const should = chai.should();

describe('OrangeHRM Service', () => {
    describe('when not stubbed', () => {
        // test cases with no stubs, i.e.,
        // testing the original service
    });


    describe('when stubbed', () => {
        

        beforeEach(() => {
            this.getAllEmployees = sinon.stub(orangeHRMService, 'getAllEmployees');
        });

        afterEach(() => {
            this.getAllEmployees.restore();
        });

        describe('[GET] getAllEmployees', () => {
            it('should return all employees', (done) => {

                this.getAllEmployees.resolves([
                    { id: 4, name: 'Höfer' },
                    { id: 5, name: 'Oelrichs' },
                ]);

                orangeHRMService.getAllEmployees()
                    .then(res => {
    
                        res.length.should.eql(2);
                        res[0].should.include.keys(
                            'id', 'name'
                        );
                        // the first object should have the right value for name
                        res[0].name.should.eql('Höfer');
                        done();
                    })


                });
            });
        })
    })

    
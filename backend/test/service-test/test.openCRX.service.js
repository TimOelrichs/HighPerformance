const sinon = require("sinon");
const crx = require("../../services/openCRX.service");
const crx_open = crx.openCRXService;

describe('OpenCRX Service', () => {
    describe('with mock: getAllAcounts', () => {
        it('should getAllAcounts', (done) => {
            let crxmock = sinon.mock(crx_open);

            crxmock.expects("getAllAcounts")
                .once()
                //.withArgs()
                .resolves('the value you want to return');

            crx_open.getAllAcounts().then(response => {
                expect(response === "worked");

            });

            crxmock.verify();
            crxmock.restore();
            done();
        });
    });
});


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const core_utils_1 = require("@eth-optimism/core-utils");
const getHexSlice = (input, start, length) => {
    return core_utils_1.toHexString(core_utils_1.fromHexString(input).slice(start, start + length));
};
describe('Lib_EthUtils', () => {
    let signer;
    before(async () => {
        ;
        [signer] = await hardhat_1.ethers.getSigners();
    });
    let Lib_EthUtils;
    before(async () => {
        Lib_EthUtils = await (await hardhat_1.ethers.getContractFactory('TestLib_EthUtils')).deploy();
    });
    describe('getCode(address,uint256,uint256)', () => {
        describe('when the contract does not exist', () => {
            const address = ethers_1.constants.AddressZero;
            describe('when offset = 0', () => {
                const offset = 0;
                it('should return length zero bytes', async () => {
                    const length = 100;
                    setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x' + '00'.repeat(length));
                });
            });
            describe('when offset > 0', () => {
                const offset = 50;
                it('should return length zero bytes', async () => {
                    const length = 100;
                    setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x' + '00'.repeat(length));
                });
            });
        });
        describe('when the account is an EOA', () => {
            let address;
            before(async () => {
                address = await signer.getAddress();
            });
            describe('when offset = 0', () => {
                const offset = 0;
                it('should return length zero bytes', async () => {
                    const length = 100;
                    setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x' + '00'.repeat(length));
                });
            });
            describe('when offset > 0', () => {
                const offset = 50;
                it('should return length zero bytes', async () => {
                    const length = 100;
                    setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x' + '00'.repeat(length));
                });
            });
        });
        describe('when the contract exists', () => {
            let address;
            let code;
            let codeLength;
            before(async () => {
                address = Lib_EthUtils.address;
                code = await hardhat_1.ethers.provider.getCode(address);
                codeLength = core_utils_1.fromHexString(code).length;
            });
            describe('when offset = 0', () => {
                const offset = 0;
                describe('when length = 0', () => {
                    const length = 0;
                    it('should return empty', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x');
                    });
                });
                describe('when 0 < length < extcodesize(contract)', () => {
                    let length;
                    before(async () => {
                        length = Math.floor(codeLength / 2);
                    });
                    it('should return N bytes from the start of code', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(getHexSlice(code, offset, length));
                    });
                });
                describe('when length = extcodesize(contract)', () => {
                    let length;
                    before(async () => {
                        length = codeLength;
                    });
                    it('should return the full contract code', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(code);
                    });
                });
                describe('when length > extcodesize(contract)', () => {
                    let length;
                    before(async () => {
                        length = codeLength * 2;
                    });
                    it('should return the full contract code padded to length with zero bytes', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(code + '00'.repeat(codeLength));
                    });
                });
            });
            describe('when 0 < offset < extcodesize(contract)', () => {
                let offset;
                before(async () => {
                    offset = Math.floor(codeLength / 2);
                });
                describe('when length = 0', () => {
                    const length = 0;
                    it('should return empty', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x');
                    });
                });
                describe('when 0 < length < extcodesize(contract) - offset', () => {
                    let length;
                    before(async () => {
                        length = Math.floor((codeLength - offset) / 2);
                    });
                    it('should return the selected bytes', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(getHexSlice(code, offset, length));
                    });
                });
                describe('when length = extcodesize(contract) - offset', () => {
                    let length;
                    before(async () => {
                        length = codeLength - offset;
                    });
                    it('should return the selected bytes', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(getHexSlice(code, offset, length));
                    });
                });
                describe('when length > extcodesize(contract) - offset', () => {
                    let length;
                    let extraLength;
                    before(async () => {
                        length = (codeLength - offset) * 2;
                        extraLength = length - (codeLength - offset);
                    });
                    it('should return the selected bytes padded to length with zero bytes', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal(getHexSlice(code, offset, codeLength - offset) +
                            '00'.repeat(extraLength));
                    });
                });
            });
            describe('offset >= extcodesize(contract)', () => {
                let offset;
                before(async () => {
                    offset = codeLength * 2;
                });
                describe('when length = 0', () => {
                    const length = 0;
                    it('should return empty', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x');
                    });
                });
                describe('when length > 0', () => {
                    let length;
                    before(async () => {
                        length = codeLength * 2;
                    });
                    it('should return length zero bytes', async () => {
                        setup_1.expect(await Lib_EthUtils['getCode(address,uint256,uint256)'](address, offset, length)).to.equal('0x' + '00'.repeat(length));
                    });
                });
            });
        });
    });
    describe('getCode(address)', () => {
        describe('when the contract does not exist', () => { });
        describe('when the account is an EOA', () => { });
        describe('when the contract exists', () => { });
    });
    describe('getCodeSize', () => {
        describe('when the contract does not exist', () => { });
        describe('when the account is an EOA', () => { });
        describe('when the contract exists', () => { });
    });
    describe('getCodeHash', () => {
        describe('when the contract does not exist', () => { });
        describe('when the account is an EOA', () => { });
        describe('when the contract exists', () => { });
    });
    describe('createContract', () => {
        describe('it should create the contract', () => { });
    });
    describe('getAddressForCREATE', () => {
        describe('when the nonce is zero', () => {
            describe('it should return the correct address', () => { });
        });
        describe('when the nonce is > 0', () => {
            describe('it should return the correct address', () => { });
        });
    });
    describe('getAddressForCREATE2', () => {
        describe('when the bytecode is not empty', () => {
            describe('when the salt is not zero', () => {
                describe('it should return the correct address', () => { });
            });
            describe('when the salt is zero', () => {
                describe('it should return the correct address', () => { });
            });
        });
        describe('when the bytecode is empty', () => {
            describe('when the salt is not zero', () => {
                describe('it should return the correct address', () => { });
            });
            describe('when the salt is zero', () => {
                describe('it should return the correct address', () => { });
            });
        });
    });
});
//# sourceMappingURL=Lib_EthUtils.spec.js.map
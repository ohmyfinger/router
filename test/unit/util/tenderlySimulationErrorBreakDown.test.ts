import {
  breakDownTenderlySimulationError
} from '../../../src/util/tenderlySimulationErrorBreakDown';
import {
  USDC_MAINNET,
  USDT_MAINNET,
  VIRTUAL_BASE
} from '../../../build/main';
import { SimulationStatus } from '../../../src/providers/simulation-provider';

describe('tenderly simulation error break down', () => {
  it('V3TooMuchRequested', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x739dbe52')
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('V3TooLittleReceived', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x39d35496')
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('V2TooLittleReceived', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x849eaf98')
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('V2TooMuchRequested', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x8ab0bc16')
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('INSUFFICIENT_OUTPUT_AMOUNT', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000025556e697377617056323a20494e53554646494349454e545f4f55545055545f414d4f554e54000000000000000000000000000000000000000000000000000000');
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('IIA', async () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000034949410000000000000000000000000000000000000000000000000000000000');
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow)
  })

  it('InsufficientToken', () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x675cae38');
    expect(simulationStatus).toEqual(SimulationStatus.Failed);
  });

  it('InsufficientToken Virtual', () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, VIRTUAL_BASE, '0x675cae38');
    expect(simulationStatus).toEqual(SimulationStatus.SlippageTooLow);
  });

  it('TRANSFER_FROM_FAILED', () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000145452414e534645525f46524f4d5f4641494c4544000000000000000000000000');
    expect(simulationStatus).toEqual(SimulationStatus.TransferFromFailed);
  });

  it('unknown data', () => {
    const simulationStatus = breakDownTenderlySimulationError(USDC_MAINNET, USDT_MAINNET, undefined);
    expect(simulationStatus).toEqual(SimulationStatus.Failed);
  });
});

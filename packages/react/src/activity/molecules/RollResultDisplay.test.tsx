import { render, screen } from '@testing-library/react';
import { RollResultDisplay, FoundryRollResultInfo } from './RollResultDisplay';

describe('RollResultDisplay', () => {
  const defaultRoll: FoundryRollResultInfo = {
    formula: '1d20+5',
    total: 18,
    terms: [],
    dice: [
      {
        class: 'Die',
        faces: 20,
        number: 1,
        results: [{ result: 13, active: true }],
      },
    ],
  };

  it('renders with default testId', () => {
    render(<RollResultDisplay roll={defaultRoll} />);
    expect(screen.getByTestId('roll-result')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<RollResultDisplay roll={defaultRoll} testId="custom-roll" />);
    expect(screen.getByTestId('custom-roll')).toBeInTheDocument();
  });

  describe('total display', () => {
    it('displays the total', () => {
      render(<RollResultDisplay roll={defaultRoll} />);
      expect(screen.getByTestId('roll-result-total')).toHaveTextContent('18');
    });

    it('displays different totals correctly', () => {
      const roll = { ...defaultRoll, total: 25 };
      render(<RollResultDisplay roll={roll} />);
      expect(screen.getByTestId('roll-result-total')).toHaveTextContent('25');
    });
  });

  describe('formula display', () => {
    it('displays formula by default', () => {
      render(<RollResultDisplay roll={defaultRoll} />);
      expect(screen.getByTestId('roll-result-formula')).toHaveTextContent('1d20+5');
    });

    it('hides formula when showFormula is false', () => {
      render(<RollResultDisplay roll={defaultRoll} showFormula={false} />);
      expect(screen.queryByTestId('roll-result-formula')).not.toBeInTheDocument();
    });
  });

  describe('dice display', () => {
    it('displays dice results by default', () => {
      render(<RollResultDisplay roll={defaultRoll} />);
      expect(screen.getByTestId('roll-result-dice')).toBeInTheDocument();
    });

    it('hides dice when showDice is false', () => {
      render(<RollResultDisplay roll={defaultRoll} showDice={false} />);
      expect(screen.queryByTestId('roll-result-dice')).not.toBeInTheDocument();
    });

    it('displays individual die results', () => {
      render(<RollResultDisplay roll={defaultRoll} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveTextContent('13');
    });

    it('displays multiple dice', () => {
      const roll: FoundryRollResultInfo = {
        formula: '2d6',
        total: 7,
        terms: [],
        dice: [
          {
            class: 'Die',
            faces: 6,
            number: 2,
            results: [
              { result: 4, active: true },
              { result: 3, active: true },
            ],
          },
        ],
      };
      render(<RollResultDisplay roll={roll} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveTextContent('4');
      expect(screen.getByTestId('roll-result-die-1')).toHaveTextContent('3');
    });

    it('shows inactive dice with reduced opacity', () => {
      const roll: FoundryRollResultInfo = {
        formula: '2d20kh',
        total: 15,
        terms: [],
        dice: [
          {
            class: 'Die',
            faces: 20,
            number: 2,
            results: [
              { result: 15, active: true },
              { result: 8, active: false },
            ],
          },
        ],
      };
      render(<RollResultDisplay roll={roll} />);
      expect(screen.getByTestId('roll-result-die-1')).toHaveClass('opacity-40');
    });
  });

  describe('sizes', () => {
    it('renders sm size', () => {
      render(<RollResultDisplay roll={defaultRoll} size="sm" />);
      expect(screen.getByTestId('roll-result-total')).toHaveClass('text-xl');
    });

    it('renders md size by default', () => {
      render(<RollResultDisplay roll={defaultRoll} />);
      expect(screen.getByTestId('roll-result-total')).toHaveClass('text-3xl');
    });

    it('renders lg size', () => {
      render(<RollResultDisplay roll={defaultRoll} size="lg" />);
      expect(screen.getByTestId('roll-result-total')).toHaveClass('text-5xl');
    });
  });

  describe('die colors', () => {
    const testDieColor = (faces: number) => {
      const roll: FoundryRollResultInfo = {
        formula: `1d${faces}`,
        total: 1,
        terms: [],
        dice: [
          {
            class: 'Die',
            faces,
            number: 1,
            results: [{ result: 1, active: true }],
          },
        ],
      };
      return roll;
    };

    it('d4 has green color', () => {
      render(<RollResultDisplay roll={testDieColor(4)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-green-600');
    });

    it('d6 has blue color', () => {
      render(<RollResultDisplay roll={testDieColor(6)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-blue-600');
    });

    it('d8 has purple color', () => {
      render(<RollResultDisplay roll={testDieColor(8)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-purple-600');
    });

    it('d10 has orange color', () => {
      render(<RollResultDisplay roll={testDieColor(10)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-orange-600');
    });

    it('d12 has red color', () => {
      render(<RollResultDisplay roll={testDieColor(12)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-red-600');
    });

    it('d20 has primary color', () => {
      render(<RollResultDisplay roll={testDieColor(20)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-discord-primary');
    });

    it('d100 has gray color', () => {
      render(<RollResultDisplay roll={testDieColor(100)} />);
      expect(screen.getByTestId('roll-result-die-0')).toHaveClass('bg-gray-600');
    });
  });

  it('handles empty dice array', () => {
    const roll = { ...defaultRoll, dice: [] };
    render(<RollResultDisplay roll={roll} />);
    expect(screen.queryByTestId('roll-result-dice')).not.toBeInTheDocument();
  });
});

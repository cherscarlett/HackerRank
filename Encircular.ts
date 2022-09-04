'use strict';

const allOneCommand = new RegExp(/^(.)\1*$/)

enum Direction {
    N = 0,
    E, 
    S, 
    W
}

type Position = {
    x: number,
    y: number,
    direction: Direction
}

function moveOnce(position: Position): Position {
    let {x, y, direction} = position
    
    switch (direction) {
        case Direction.N:
            y++
            break
        case Direction.E:
            x++
            break
        case Direction.S:
            y--
            break
        case Direction.W:
            x--
    }
    
    return {x, y, direction} 
}

function findPattern(command: string): string {
    if (`${command}${command}`.indexOf(command, 1) !== command.length) { 
        // if the string contains a repeating pattern, find it and return it
        let accumulater: string = ''
        
        for (let i = 0; i < command.length; i++) {
            accumulater = accumulater + command[i]
            
            if (accumulater.length > 1 && (command.length % accumulater.length === 0) && accumulater[i - 1] !== command[i]) {
                return accumulater
            }
        }
    }
    
    return command;
}

function doesCircleExist(commands: string[]): string[] {
    let results: string[] = []
    
    commands.forEach((command: string) => {
        let x = 0, y = 0, direction: Direction = Direction.N, moveRobot = command
        
        if (command.length === 1 || allOneCommand.test(command)) moveRobot = command // eg, G or LLL
        
        else moveRobot = findPattern(command) // find the repeating command
        
        moveRobot = moveRobot.repeat(4) // Run command 4 times to check for a circle
                
        for (let i = 0; i < moveRobot.length; i++) {
            let move = moveRobot[i]
                        
            switch (move) {
                case 'R':
                    direction = (direction + 1) % 4
                    break
                case 'L':
                    direction = (4 + direction - 1) % 4
                    break
                case 'G':
                    const newPosition = moveOnce({x, y, direction})
                    x = newPosition.x
                    y = newPosition.y
                    break
                default:
                    console.error('Invalid command')
                    break
            }
        }  
        const result = x === 0 && y === 0 ? 'YES' : 'NO'
        
        results.push(result)
    })
    
    return results
}

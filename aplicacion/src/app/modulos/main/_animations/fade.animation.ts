import { trigger, state, animate, transition, style, group, query } from '@angular/animations';

export const fadeInAnimation =

trigger('routerTransition', [
    transition('* <=> *', [
        group([
            query(':enter',
                [
                    style({
                        position: 'fixed',
                        width: '100%',
                        opacity: 0,
                        transform: 'translateY(-100%)'
                    }),
                    animate(
                        '0.5s cubic-bezier(0, 1.8, 1, 1.8)',
                        style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
                    ),
                ],
                { optional: true }
            ),
            query(':leave',
                animate('0.5s  cubic-bezier(0.445, 0.050, 0.550, 0.950)',
                    style({
                        position: 'fixed',
                        width: '100%',
                        opacity: 0, transform: 'translateY(100%) rotate(0)'
                    })
                ),
                { optional: true }
            ),
        ])
    ])
])

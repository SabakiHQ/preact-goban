const {h, render, Component} = require('preact')
const {Goban} = require('..')

const chineseCoord = [
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九'
]

const signMap = [
    [0,0,0,-1,-1,-1,1,0,1,1,-1,-1,0,-1,0,-1,-1,1,0],
    [0,0,-1,0,-1,1,1,1,0,1,-1,0,-1,-1,-1,-1,1,1,0],
    [0,0,-1,-1,-1,1,1,0,0,1,1,-1,-1,1,-1,1,0,1,0],
    [0,0,0,0,-1,-1,1,0,1,-1,1,1,1,1,1,0,1,0,0],
    [0,0,0,0,-1,0,-1,1,0,0,1,1,0,0,0,1,1,1,0],
    [0,0,-1,0,0,-1,-1,1,0,-1,-1,1,-1,-1,0,1,0,0,1],
    [0,0,0,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,1,1,1],
    [0,0,-1,1,1,0,1,-1,-1,1,0,1,-1,0,1,-1,-1,-1,1],
    [0,0,-1,-1,1,1,1,0,-1,1,-1,-1,0,-1,-1,1,1,1,1],
    [0,0,-1,1,1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,1,-1,-1],
    [-1,-1,-1,-1,1,1,1,-1,0,-1,1,-1,-1,0,-1,1,1,-1,0],
    [-1,1,-1,0,-1,-1,-1,-1,-1,-1,1,-1,0,-1,-1,1,-1,0,-1],
    [1,1,1,1,-1,1,1,1,-1,1,0,1,-1,0,-1,1,-1,-1,0],
    [0,1,-1,1,1,-1,-1,1,-1,1,1,1,-1,1,-1,1,1,-1,1],
    [0,0,-1,1,0,0,1,1,-1,-1,0,1,-1,1,-1,1,-1,0,-1],
    [0,0,1,0,1,0,1,1,1,-1,-1,1,-1,-1,1,-1,-1,-1,0],
    [0,0,0,0,1,1,0,1,-1,0,-1,-1,1,1,1,1,-1,-1,-1],
    [0,0,1,1,-1,1,1,-1,0,-1,-1,1,1,1,1,0,1,-1,1],
    [0,0,0,1,-1,-1,-1,-1,-1,0,-1,-1,1,1,0,1,1,1,0]
]

const paintMap = [
    [-1,-1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,1,-1,-1,1,-1,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,0,0,0,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,-1,-1,0,1,1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,1,1,1],
    [-1,-1,-1,1,1,1,1,-1,-1,1,0,1,-1,-1,-1,-1,-1,-1,1],
    [-1,-1,-1,-1,1,1,1,0,-1,1,-1,-1,-1,-1,-1,1,1,1,1],
    [-1,-1,-1,1,1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,1,-1,-1],
    [-1,-1,-1,-1,1,1,1,-1,-1,-1,1,-1,-1,-1,-1,1,1,-1,-1],
    [-1,1,-1,0,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,-1,1,1,1,-1,1,1,1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,1,1,1,-1,-1,-1,1,1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,-1,0,1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,1,-1,-1,1,-1,-1,1,-1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1],
    [1,1,1,1,-1,1,1,-1,-1,-1,-1,1,1,1,1,1,1,-1,1],
    [1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1]
]

const heatMap = (() => {
    let _ = null
    let O = (strength, text) => ({strength, text})

    return [
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,O(7),O(9, 'Good\nmove'),_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,O(3),_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,O(2),_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,O(1, 'Bad'),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,O(5, '67%\n1234'),O(4),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]
    ]
})()

const markerMap = (() => {
    let _ = null
    let O = {type: 'circle'}
    let X = {type: 'cross'}
    let T = {type: 'triangle'}
    let Q = {type: 'square'}
    let $ = {type: 'point'}
    let S = {type: 'loader'}
    let L = label => ({type: 'label', label})
    let A = L('a')
    let B = L('b')
    let C = L('c')

    return [
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,O,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,X,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,X,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,X,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,T,T,T,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,$,$,$,_,_,_,_,_,_,_,_,_,_,_,S,S,S,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,Q,_,_,_,_,_,_,_,_,_,L('Long\nlabel')],
        [_,_,_,_,_,_,_,_,Q,_,_,_,_,_,_,_,_,_,C],
        [_,_,_,_,_,_,_,_,Q,_,_,_,_,_,_,_,_,_,B],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,A]
    ]
})()

const ghostStoneMap = (() => {
    let _ = null
    let O = t => ({sign: -1, type: t})
    let X = t => ({sign: 1, type: t})
    let o = t => ({sign: -1, type: t, faint: true})
    let x = t => ({sign: 1, type: t, faint: true})

    return [
        [X(),x(),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [O(),o(),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [X('good'),x('good'),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [X('interesting'),x('interesting'),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [X('doubtful'),x('doubtful'),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [X('bad'),x('bad'),_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]
    ]
})()

const createTwoWayCheckBox = (state, setState) => (
    ({stateKey, text}) => h('label',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },

        h('input', {
            style: {marginRight: '.5em'},
            type: 'checkbox',
            checked: state[stateKey],

            onClick: () => setState(s => ({[stateKey]: !s[stateKey]}))
        }),

        h('span', {style: {userSelect: 'none'}}, text)
    )
)

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signMap,
            vertexSize: 24,
            showCoordinates: false,
            alternateCoordinates: false,
            showCorner: false,
            showDimmedStones: false,
            fuzzyStonePlacement: false,
            animateStonePlacement: false,
            showPaintMap: false,
            showHeatMap: false,
            showMarkerMap: false,
            showGhostStones: false,
            showLines: false,
            showSelection: false,
            isBusy: false
        }

        this.CheckBox = createTwoWayCheckBox(this.state, this.setState.bind(this))
    }

    render() {
        let {vertexSize, showCoordinates, alternateCoordinates, showCorner,
            showDimmedStones, fuzzyStonePlacement, animateStonePlacement, showPaintMap,
            showHeatMap, showMarkerMap, showGhostStones,
            showLines, showSelection} = this.state

        return h('section',
            {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '15em auto',
                    gridColumnGap: '1em'
                }
            },

            h('form',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                },

                h('p', {style: {margin: '0 0 .5em 0'}},
                    'Size: ',

                    h('button', {
                        type: 'button',
                        onClick: evt => {
                            this.setState(s => ({vertexSize: Math.max(s.vertexSize - 4, 4)}))
                        }
                    }, '-'), ' ',

                    h('button', {
                        type: 'button',
                        title: 'Reset',
                        onClick: evt => {
                            this.setState({vertexSize: 24})
                        }
                    }, '•'), ' ',

                    h('button', {
                        type: 'button',
                        onClick: evt => {
                            this.setState(s => ({vertexSize: s.vertexSize + 4}))
                        }
                    }, '+')
                ),

                h('p', {style: {margin: '0 0 .5em 0'}},
                    'Stones: ',

                    h('button', {
                        type: 'button',
                        title: 'Reset',
                        onClick: evt => {
                            this.setState({signMap})
                        }
                    }, '•')
                ),

                h(this.CheckBox, {stateKey: 'showCoordinates', text: 'Show coordinates'}),
                h(this.CheckBox, {stateKey: 'alternateCoordinates', text: 'Alternate coordinates'}),
                h(this.CheckBox, {stateKey: 'showCorner', text: 'Show lower right corner only'}),
                h(this.CheckBox, {stateKey: 'showDimmedStones', text: 'Dim dead stones'}),
                h(this.CheckBox, {stateKey: 'fuzzyStonePlacement', text: 'Fuzzy stone placement'}),
                h(this.CheckBox, {stateKey: 'animateStonePlacement', text: 'Animate stone placement'}),
                h(this.CheckBox, {stateKey: 'showMarkerMap', text: 'Show markers'}),
                h(this.CheckBox, {stateKey: 'showGhostStones', text: 'Show ghost stones'}),
                h(this.CheckBox, {stateKey: 'showPaintMap', text: 'Show paint map'}),
                h(this.CheckBox, {stateKey: 'showHeatMap', text: 'Show heat map'}),
                h(this.CheckBox, {stateKey: 'showLines', text: 'Show lines'}),
                h(this.CheckBox, {stateKey: 'showSelection', text: 'Show selection'}),
                h(this.CheckBox, {stateKey: 'isBusy', text: 'Busy'})
            ),

            h('div', {},
                h(Goban, {
                    vertexSize,
                    animate: true,
                    busy: this.state.isBusy,
                    rangeX: showCorner ? [8, 18] : undefined,
                    rangeY: showCorner ? [12, 18] : undefined,
                    coordX: alternateCoordinates ? i => chineseCoord[i] : undefined,
                    coordY: alternateCoordinates ? i => i + 1 : undefined,

                    signMap: this.state.signMap,
                    showCoordinates,
                    fuzzyStonePlacement,
                    animateStonePlacement,
                    paintMap: showPaintMap && paintMap,
                    heatMap: showHeatMap && heatMap,
                    markerMap: showMarkerMap && markerMap,
                    ghostStoneMap: showGhostStones && ghostStoneMap,

                    lines: showLines ? [
                        {type: 'line', v1: [15, 6], v2: [12, 15]},
                        {type: 'arrow', v1: [10, 4], v2: [5, 7]}
                    ] : [],

                    dimmedVertices: showDimmedStones ? [
                        [2, 14], [2, 13], [5, 13], [6, 13],
                        [9, 3], [9, 5], [10, 5], [14, 7],
                        [13, 13], [13, 14], [18, 13]
                    ] : [],

                    selectedVertices: showSelection ? [
                        [9, 7]
                    ] : [],

                    onVertexMouseUp: (evt, [x, y]) => {
                        let signMap = JSON.parse(JSON.stringify(this.state.signMap))
                        signMap[y][x] = Math.sign(Math.random() - .5) || 1

                        this.setState({signMap})
                    }
                }),

                alternateCoordinates && h('style', {}, `
                    .shudan-coordx span {
                        font-size: .45em;
                    }
                `)
            )
        )
    }
}

render(h(App), document.body)

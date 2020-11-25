const Controller = require("./dbController");
const jwt = require('jsonwebtoken')
const CustomError = require("../helper/customErrorHelper");
const { salt, checkPassword } = require("../helper/bcryptHelper");
const Ajv = require('ajv');

const secret = process.env.JWT_SECRET

const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 1, maxLength: 24 },
    password: { type: 'string', minLength: 1, maxLength: 24 }
  },
  required: ['username', 'password'],
  additionalProperties: false
}
const validator = ajv.compile(schema)

function validateBody(body) {
  const isValid = validator(body)
  if (!isValid) {
    throw new CustomError(400, "ERR_VALIDATION",
      "Wrong body",
      validator.errors.map(err => `${err.dataPath} ${err.message}`).join())
  }
}

class UserController extends Controller {
  constructor(body) {
    super('users')
    this.body = body
  }
  validate() {
    validateBody(this.body)
    return this
  }

  async register() {
    this.body.password = await salt(this.body.password)
    await this.add(this.body)
    this.body.token = jwt.sign(this.body, secret, {
      expiresIn: '6h'
    })
  }

  async login() {
    let user = await this.get({ username: this.body.username })
    if (!user.length)
      throw new CustomError(404, "ERR_UNAVAILABLE", "User unavailable")
    user = user[0]
    const isPassMatch = await checkPassword(this.body.password, user.password)
    if (!isPassMatch)
      throw new CustomError(400, "ERR_PASS_NOT_MATCH", "Password not match")
    this.body.id = user.id
    this.body.token = jwt.sign(this.body, secret, {
      expiresIn: '6h'
    })
  }
}

module.exports = UserController